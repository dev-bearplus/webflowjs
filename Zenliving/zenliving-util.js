function redirectThankyou() {
  window.location.href = `${window.location.origin}/thank-you`
}

function uploadFile(file, folder) {
  // https://script.google.com/macros/s/AKfycbzgEHbrlmRFl2vD9jZ0bzULaroPwX4mYxS3hMezfkXB6FVHs-RwFNinfdOuy2z8J7o/exec
  const idScript = 'AKfycbzDi5SvOgFjaNTvxSzbsyDfZs5mgvQSffpM2K-Z6xogHe9zGdWPAmwrBtpa8OVS4LyQLQ'
  const endpoint = `https://script.google.com/macros/s/${idScript}/exec`
  return new Promise((res, rej) => {
    if (!file) res({});
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      const rawLog = reader.result.split(',')[1];
      const dataSend = {
        dataReq: {
          data: rawLog,
          name: file.name,
          type: file.type,
          folderName: folder
        },
        fname: "uploadFilesToGoogleDrive"
      };
      fetch(endpoint, { method: "POST", body: JSON.stringify(dataSend) })
        .then(res => res.json()).then((a) => {
          res(a)
        }).catch(e => rej(e))
    }
  })
}

function initForm(form, options) {
  const { submitEle = {}, onSuccess, onError, handleSubmit, prepareMap, fileOptions, fields, pageName = "Form", hubspot } = options;
  const { ele, textEle } = submitEle;

  let submitBtn = $(form).find('input[type=submit]');
  if (ele) {
    submitBtn = $(form).find(ele);
  }
  let defaultText = submitBtn.clone().val();
  if (textEle) {
    defaultText = submitBtn.find(textEle).clone().text();
  }
  // console.log(submitBtn.find(textEle).clone().text(), defaultText)

  let url = $(form).attr('action');

  if (hubspot) {
    const { portalId, formId } = hubspot;
    url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  }

  const setLoading = (isLoading) => {
    console.log(isLoading);
    if (isLoading) {
      if (textEle) {
        submitBtn.find(textEle).text('Please wait ...');
      } else {
        submitBtn.val('Please wait ...');
      }

      submitBtn.css({ 'pointer-events': 'none' })
    }
    else {
      if (textEle) {
        submitBtn.find(textEle).text(defaultText);
      } else {
        submitBtn.val(defaultText)
      }
      submitBtn.css({ 'pointer-events': '' })
    }
  }

  const showError = (message = "Something error") => {
    alert(message)
  }
  const mapField = (data) => {
    if (!fields.length) return [];

    const result = fields.map((field) => {
      const { name, value } = field;
      if (!value) {
        return {
          name,
          value: data[name] || ""
        }
      }
      else {
        const getValue = value(data);
        return {
          name,
          value: getValue || ''
        }
      }
    })
    return result;
  }
  const sendSubmission = (data) => {
    const mappedFields = mapField(data);
    const dataSend = {
      fields: mappedFields,
      context: {
        pageUri: window.location.href,
        pageName: pageName,
      },
    };
    $.ajax({
      url: url,
      method: 'POST',
      data: JSON.stringify(dataSend),
      dataType: 'json',
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      contentType: 'application/json',
      success: function (response) {
        $(form).get(0).reset()
        if (fileOptions) {
          const { fileEle } = fileOptions;
          fileEle.reset();
        }
        if (onSuccess) onSuccess();
        // alert('Success');
        setLoading(false);
      },
      error: function (error) {
        if (error.readyState === 4) {
          const errors = error.responseJSON.errors
          const errorArr = errors[0].message.split('.')
          const errorMess = errorArr[errorArr.length - 1]

          showError(errorMess);
        }
        else {
          showError('Something error');
        }
        setLoading(false)
      },
    });
  }
  $(form).on("submit", function (e) {
    e.preventDefault();
    setLoading(true);
    if (prepareMap) {
      prepareMap($(this));
    }
    const data = mapFormToObject(e.target);
    if (fileOptions) {
      const { fileEle, required, folder } = fileOptions;
      const file = fileEle.getFile();
      if (required && !file) {
        showError('Missed file upload');
        setLoading(false);
        return false;
      }
      uploadFile(file, folder).then((result) => {
        data.fileUrl = result.url;
        if (handleSubmit) handleSubmit(data, () => {
          setLoading(false);
          $(form).get(0).reset()
          if (fileOptions) {
            const { fileEle } = fileOptions;
            fileEle.reset();
          }
        });
        if (hubspot) sendSubmission(data);
      })
      return false;
    }
    if (handleSubmit) handleSubmit(data, () => {
      setLoading(false);
      $(form).get(0).reset()
      if (fileOptions) {
        const { fileEle } = fileOptions;
        fileEle.reset();
      }
    });
    if (hubspot) sendSubmission(data);
    return false;

  });
}

function initBtnUploadFile() {
  const currentTextUpload = $('.btn-upload-file').find('.text-md').clone().text();
  const maxAllowedSize = 10 * 1024 * 1024;
  const resetBtnUploadFile = (ele) => {
    ele.find('.upload').removeClass('hidden');
    ele.find('.uploaded').addClass('hidden');

    ele.find('.upload-file-tooltip').removeClass('hidden');
    ele.find('.ic-close-file').addClass('hidden');

    ele.find('input[type=file]').val("");
    ele.find('.btn-upload-file .text-md').text(currentTextUpload);
  }

  const handleUploadFile = (ele, file) => {
    ele.find('.uploaded').removeClass('hidden');
    ele.find('.upload').addClass('hidden');

    ele.find('.upload-file-tooltip').addClass('hidden');
    ele.find('.ic-close-file').removeClass('hidden');

    const fileName = shortedFileName(file.name);
    ele.find('.btn-upload-file .text-md').text(fileName);
  }
  $(".upload-file-wrapper .btn-upload-file").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".upload-file-wrapper").find('input[type=file]').click();
  })
  $('.upload-file-wrapper .ic-close-file').on("click", function () {
    const wrapper = $(this).closest('.upload-file-wrapper');
    resetBtnUploadFile(wrapper);
  })
  $('input[type=file]').change(function () {
    const file = $(this).get(0).files[0] //the file
    if (file.size > maxAllowedSize) {
      alert('Maximum allowed size file');
      return;
    }
    const wrapper = $(this).closest('.upload-file-wrapper');
    if (!file) {
      resetBtnUploadFile(wrapper);
      return;
    };
    handleUploadFile(wrapper, file)
  })

  return {
    reset: () => resetBtnUploadFile($('.upload-file-wrapper')),
    upload: () => $(".upload-file-wrapper .btn-upload-file").trigger("click"),
    getFile: () => $('input[type=file]').get(0).files[0]
  }
}

function renameElement($element, newElement) {

  $element.wrap("<" + newElement + ">");
  const $newElement = $element.parent();

  //Copying Attributes
  $.each($element.prop('attributes'), function () {
    $newElement.attr(this.name, this.value);
  });

  $element.contents().unwrap();

  return $newElement;
}
function shortedFileName(name, size = 16) {
  const splitFile = name.split('.');
  return `${truncate(splitFile[0], size)}.${splitFile[1]}`
}
function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

function mapFormToObject(ele) {
  return (parsedFormData = [...new FormData(ele).entries()].reduce(
    (prev, cur) => {
      const name = cur[0];
      const val = cur[1];
      return { ...prev, [name]: val };
    },
    {}
  ));
}

function getViewportOffset($e) {
  const $window = $(window);
  const scrollLeft = $window.scrollLeft();
  const scrollTop = $window.scrollTop();
  const offset = $e.offset();

  const width = $e.outerWidth();
  const height = $e.outerHeight();

  console.log(width, height);
  return {
    left: offset.left - scrollLeft + width / 2,
    top: offset.top - scrollTop + height / 2,
  };
}

function initCMS(props) {
  const {
    selector: cmsSelector,
    pagination = {
      itemPerPage: 4
    },
    setupFilter
  } = props;
  const listEle = $(cmsSelector);
  const EVENT = {
    ON_PAGINATION: 'ON_PAGINATION',
    ON_FILTER: 'ON_FILTER',
  }
  function getCurrentQS() {
    const page = (parseInt(getQS().page) || 1);
    const p = getQS().p;
    return {
      page,
      p
    }
  }
  let currentQS = getCurrentQS();
  function updateCurrentQS(params) {
    updateQS(params);
    currentQS = getCurrentQS();
  }

  function setupPagination(total) {
    if (total <= 1) {
      $('.sccate-main-pagination').css({ display: 'none' })
    } else {
      $('.sccate-main-pagination').css({ display: 'flex' })
    }
    const pageItemEle = $('.pagination-number-list').find('.pagination-number-item').first().removeClass('active');
    const createPaginationArr = () => {
      let arr = [];
      const {
        page: currentPage = 1
      } = getCurrentQS();
      if (total <= 6) {
        arr = new Array(total).fill().map((_, i) => i + 1);
        // return result;
      } else {
        if (currentPage <= 3) {
          arr.push(...[1, 2, 3, 4, "...", total])
          // return result;
        }
        else if (currentPage >= total - 2) {
          arr.push(...[1, "...", total - 3, total - 2, total - 1, total])
          // return result;
        } else {
          arr.push(...[1, "...", currentPage - 1, currentPage, currentPage + 1, "...", total])
        }
      }
      return arr;
    }

    function moveToPage(page) {
      updateCurrentQS({ page });
      createPaginationEle();

      $(".main")[0].scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
      listEle.trigger(EVENT.ON_PAGINATION);
    }

    function createPaginationEle() {
      $('.pagination-number-list').empty();
      const arr = createPaginationArr();
      arr.forEach((page) => {
        pageItemEle.find('.pagination-number').text(page);
        const newPageItemEle = pageItemEle.clone();
        newPageItemEle.on("click", function () {
          if ($(this).find('.pagination-number').text() === "...") {
            return;
          }
          moveToPage(page);
        })
        $('.pagination-number-list').append(newPageItemEle);
        requestAnimationFrame(() => {
          if (page === (getCurrentQS().page || 1)) {
            newPageItemEle.addClass('active');
          }
        });
      })
    }
    $('.pagination-btn').eq(0).off("click");
    $('.pagination-btn').eq(0).on("click", function (e) {
      e.preventDefault();
      const { page } = getCurrentQS();
      if (page === 1) return;
      moveToPage(page - 1);
    })

    $('.pagination-btn').eq(1).off("click");
    $('.pagination-btn').eq(1).on("click", function (e) {
      e.preventDefault();
      const { page } = getCurrentQS();
      if (page === total) return;
      moveToPage(page + 1);
    })
    createPaginationEle();
  }

  // Get all items
  function getAllItem() {
    try {
      function getNextUrl(listCMS = listEle) {
        const webflowNavigation = listCMS.next();
        const nextUrl = webflowNavigation.find('.w-pagination-next').attr('href');
        return nextUrl;
      }
      const nextUrl = getNextUrl();
      let items = [];
      listEle.children().each(function () {
        items.push(this);
      })
      if (!nextUrl) return Promise.resolve(items)

      function fetchAllItem(url) {
        console.log('get all')
        return new Promise(resolve => {
          getHTML(url).then((result) => {
            const nextListEle = $(result).find(cmsSelector);
            const nextUrl = getNextUrl(nextListEle)
            nextListEle.children().each(function () {
              items.push(this);
            })
            if (nextUrl) {
              resolve(fetchAllItem(nextUrl));
            }
            resolve(items);
          });
        })
      }

      return fetchAllItem(nextUrl);
    } catch (error) {
      console.log(error);
    }

  }

  function loadModal(ele) {
    lockBodyScroll();
    const $this = ele;
    // console.log(getViewportOffset($this.find('.img-raito-wrapper')));

    const name = $this.find('.sccate-product-item-name').text();
    const sku = $this.find('.sccate-product-item-sku').text();
    const desc = $this.find('.product-txt-desc').text();
    const img = $this.find('.img-raito-wrapper').children().clone();
    const href = $this.find('.sccate-main-href').attr('href');

    $('.modal').find('.sccate-modal-name .heading').text(name);
    if (sku != '') {
      $('.sccate-modal-span').removeClass('hidden')
    } else {
      $('.sccate-modal-span').addClass('hidden')
    }
    $('.modal').find('.sccate-modal-name .sccate-modal-sku').text(sku && `${sku}`);
    $('.modal').find('.sccate-modal-img-wrapper').html(img);
    $('.modal').find('.modal-product-desc').text(desc);

    const linkShare = `${window.location.origin}${href}`;

    // console.log($(this).find('.sccate-main-href').attr('data-share', linkShare).clone());

    $('.modal').append($this.find('.sccate-main-href').attr('data-share', linkShare).clone());

    const varItem = $('.sccate-modal-var-item').first();
    $('.sccate-modal-var').empty();

    $this.find('[data-filter-type]').each(function () {
      const type = $(this).attr('data-filter-type')
      const value = $(this).attr('data-filter-value')

      varItem.find('.sccate-modal-var-type').text(type);
      varItem.find('.sccate-modal-var-val').text(value);

      $('.sccate-modal-var').append(varItem.clone());
    });

    $('.modal').addClass('show');
    $('.modal').on('closeModal', () => {
      const qs = getCurrentQS();
      updateQS({ page: qs.page }, true)
      $('.modal').off('closeModal');
    })
  }

  function updateItem(result) {
    const { page } = getCurrentQS();
    // listEle.children().removeClass('fadein');
    listEle.empty();
    listEle.append(result[page - 1]);
    // listEle.children().addClass('fadein');
    requestAnimationFrame(() => {
      listEle.children().find('.sccate-product-item-img').on("click", function (e) {
        e.preventDefault();
        const qs = getCurrentQS();
        updateCurrentQS({
          page: qs.page,
          p: $(this).closest('.sccate-product-item').find('.sccate-main-href').attr('href')
        })
        loadModal($(this).closest('.sccate-product-item'))
      })
    })
  }
  function renderItem(result) {
    let filterResult = result;
    listEle.on(EVENT.ON_FILTER, (_, { filter }) => {
      if (!filter.length) {
        filterResult = result;
      } else {
        filterResult = result.filter(function (ele) {
          const $this = $(ele);
          let flag = true;
          filter.forEach(({ type, data }) => {
            const value = $this.find(`[data-filter-type='${type}']`).attr('data-filter-value');
            if (!data.includes(value)) {
              flag = false;
            }
          })
          return flag
        });
      }

      const chunkResult = chunkArray(filterResult, pagination.itemPerPage);
      updateCurrentQS({ page: 1 })
      setupPagination(chunkResult.length);
      updateItem(chunkResult);
    })

    listEle.on(EVENT.ON_PAGINATION, () => {
      const chunkResult = chunkArray(filterResult, pagination.itemPerPage);
      setupPagination(chunkResult.length);
      updateItem(chunkResult);
    })
    const chunkResult = chunkArray(filterResult, pagination.itemPerPage);
    setupPagination(chunkResult.length);
    updateItem(chunkResult);

    requestAnimationFrame(() => {
      const qs = getCurrentQS();
      if (qs.p) {
        const item = $(result).find(`.sccate-main-href[href='${qs.p}']`).closest('.sccate-product-item');
        loadModal(item);
        // console.log(item);
      }
    })

  }

  getAllItem().then((result) => {
    // console.log(result);
    // const clone = $("<div></div>");
    // allItems = result;
    // console.log(result)
    // clone.html(result);
    renderItem(result);
    setupFilter(result);
  });

  return {
    onFilter: (filter) => {
      listEle.trigger(EVENT.ON_FILTER, { filter });
      console.log('ON FILTER', filter);

      const result = filter.reduce((prev, curr) => {
        const data = curr.data;
        return prev + data.length;
      }, 0);

      if ($(window).width() < 991) {
        if (result > 0) {
          $('.filter-header-count-text').text(`Clear all(${result})`)
          $('.head-filter-count-wrap').addClass('show');
          $('.head-filter-count-wrap .filter-count-text').text(`${result}`);
        } else {
          $('.filter-header-count-text').text(``)
          $('.head-filter-count-wrap').removeClass('show');
          $('.head-filter-count-wrap .filter-count-text').text('0');
        }
      }
    }
  }
}

function chunkArray(arr, size) {
  return arr.reduce((acc, curr, i, self) => {
    if (!(i % size)) {
      return [
        ...acc,
        self.slice(i, i + size),
      ];
    }
    return acc;
  }, [])
}

function getHTML(url) {
  return new Promise((res) => {
    let xml = new XMLHttpRequest();
    xml.open("GET", url);
    xml.send();
    xml.onload = () => {
      if (xml.status == 200) return res(xml.response);
    };
  })
}

function openWindow(url) {

  let height = window.screen.availHeight - 100;
  let width = window.screen.availWidth - 150;
  window.open(url, `width=${width},height=${height}`);
}

function createShareFacebookUrl(url) {
  const encodedUrl = encodeURI(url);
  return `https://www.facebook.com/sharer.php?u=${encodedUrl}`
}

function createShareLinkedinUrl(url) {
  const encodedUrl = encodeURI(url);
  return `https://www.linkedin.com/shareArticle?url=${encodedUrl}`
}

function createShareMailUrl(url) {
  const encodedUrl = encodeURI(url);
  return `mailto:?body=${encodedUrl}`
}

function createShareHouzzUrl(url) {
  const encodedUrl = encodeURI(url);
  return `https://www.houzz.com/imageClipperUpload?imageUrl=${encodedUrl}`
}


function createFloat(content, dur = 3000) {
  const floatContainer = document.querySelector('.floating-container');
  if (floatContainer) {
    const floatMess = document.createElement("div");

    const removeFunc = setTimeout(function () {
      floatMess.classList.remove('show');
      floatMess.addEventListener('transitionend', (e) => {
        floatMess.remove();
      })
    }, dur);

    floatMess.textContent = content;
    floatMess.classList.add('text-md', 'floating-mess')

    requestAnimationFrame(() => {
      floatMess.classList.add('show');
    })

    floatContainer.appendChild(floatMess);
  }
}

function updateQS(query, force = false) {
  const baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
  const searchParams = force ? new URLSearchParams() : new URLSearchParams(window.location.search);
  Object.entries(query).forEach(([k, v]) => {
    searchParams.set(k, v);
  });
  window.history.replaceState({}, '', `${baseUrl}?${searchParams.toString()}`);
}

function getQS() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params || {};
}

function lockBodyScroll() {
  if ($(window).width() <= 768) return;
  document.querySelectorAll('[data-lock]').forEach((t) => {
    console.log('lock')
    bodyScrollLock.disableBodyScroll(t);
  });
};

function unlockBodyScroll() {
  if ($(window).width() <= 768) return;
  document.querySelectorAll('[data-lock]').forEach((t) => {
    console.log('unlock')
    bodyScrollLock.enableBodyScroll(t);
  });
};

function checkInView(selector) {

  const io = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        observer.unobserve(entry.target)
      }
    });
  });

  document.querySelectorAll(selector).forEach((e) => {
    e.classList.remove('is-inview');
    io.observe(e);
  })
}

function playListVideo(selector) {
  if ($(window).width() > 991) {
    const ele = $(selector);
    let i = 0;

    function videoPlay(index) {
      ele[index].loop = false;
      ele[index].autoplay = true;
      ele[index].load();
    }

    function handler() {
      i++;
      if (i === ele.length) {
        i = 0;
      }
      videoPlay(i);
    }
    ele.each(function (index) {
      this.pause();
      this.loop = true;
    })

    // videoPlay(0);
    // ele.on('ended', handler)
    ele.hover(function () {
      this.play()
      // this.autoplay = true;
      // this.loop = false;
      // this.load();
    }, function () {
      this.pause();
    })
  } else {
    let videos = document.querySelectorAll(selector);
    videos.forEach((video) => {
      video.muted = true;
      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {
          let observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (
                  entry.intersectionRatio !== 1 &&
                  !video.paused
                ) {
                  video.pause();
                } else if (video.paused) {
                  video.play();
                }
              });
            },
            { threshold: 1 }
          );
          observer.observe(video);
        });
      }
    });
  }
}

function throttle(func, wait = 100) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}

function activeAccor(activeZone) {
  $(`${activeZone} [data-accor="head"]`).on('click', (e) => {
    e.preventDefault();
    let content = $(e.target).next('[data-accor="content"]');
    if ($(e.target).hasClass('active')) {
      $(e.target).removeClass('active');
      content.slideUp();
    } else {
      $('[data-accor="content"]').slideUp();
      $('[data-accor="head"]').removeClass('active');
      $(e.target).addClass('active')
      content.slideDown();
    }
  })
}
function shareMedia() {
  let currLocation = window.location.href;

  $(`[data-share=twitter]`).attr('href', `https://twitter.com/share?url=${currLocation}`)
  $(`[data-share=linkedin]`).attr('href', `https://www.linkedin.com/sharing/share-offsite/?url=${currLocation}`)
  $(`[data-share=fb]`).attr('href', `https://www.facebook.com/sharer/sharer.php?u=${currLocation}`)
}
function formSuccess(formEle) {
  document.querySelector(formEle).reset();
  $('.success-wrap').addClass('show');
  setTimeout(() => {
    $('.success-wrap').removeClass('show');
  }, 5000);
  $('.ic-success-close').on('click', (e) => {
    e.preventDefault();
    $('.success-wrap').removeClass('show');
  })
}
function dropdownSubMenu(headEle, bodyEle) {
  if ($(window).width() < 991) {
    $(headEle).on('click', (e) => {
      e.preventDefault();
      if (!$(e.target).hasClass('active')) {
        $(e.target).addClass('active');
        $(e.target).parent().parent().find(bodyEle).slideDown(300)
      } else {
        $(e.target).removeClass('active');
        $(e.target).parent().parent().find(bodyEle).slideUp(300)
      }
    })
  }
}
function hoverLarge() {
  $('[data-hover="large"]').on('mouseenter', (e) => {
    console.log('hover')
    $(e.target).find('.underline').addClass('on-hover');
  })
  $('[data-hover="large"]').on('mouseleave', (e) => {
    $('.underline').removeClass('on-hover');
  })
}