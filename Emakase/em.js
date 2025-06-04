const mainScript = () => {
    console.log('Emakase Script');

    //Smooth Scroll
    $('html').css('scroll-behavior', 'auto');
    $('html').css('height', 'auto');
    
    function easing(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
    }
    const lenis = new Lenis({
        easing: easing,
    })
    const lang = $('html').attr('lang')
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    //Scroll Events
    let header = $('.header');
    lenis.on('scroll', function(inst) {
        if (inst.scroll > header.height()) {
            header.addClass('on-scroll');
            if ($(window).width() < 991) {
                $('.header-nav').addClass('on-scroll');
            }
        } else {
            header.removeClass('on-scroll');
            if ($(window).width() < 991) {
                $('.header-nav').removeClass('on-scroll');
            }
        }
    });
    
    const handleAccor = (list) => {
        $(list).each((idxPr, list) =>  {
            $(list).find('.accor-item').each((idxIt, item) =>  {
                $(list).find('.accor-item-body').slideUp()
    
                $(item).find('.accor-item-head').on('click', function(e) {
                    e.preventDefault()
    
                    if ( !$(this).hasClass('active') ) {
                        $(list).find('.accor-item-head, .accor-item').removeClass('active')
                        $(item).addClass('active')
                        $(this).addClass('active')
    
                        $(list).find('.accor-item-body').slideUp()
                        $(item).find('.accor-item-body').slideDown()
                    } else {
                        $(list).find('.accor-item-head, .accor-item').removeClass('active')
                        $(list).find('.accor-item-body').slideUp()
                    }
                })
            })
        })
    }
    
    if ($(window).width() <= 991) {
        $('.btn-toggle').on('click', function(e) {
            e.preventDefault();
            $('.header-nav').slideToggle();
            $('.header-nav').toggleClass('active')
            if ($('.header-nav').hasClass('active')) {
                $('body').addClass('on-nav-open')
            } else {
                $('body').removeClass('on-nav-open')
            }
            $('.header-drop-wrap').slideUp();
            $('.header-drop-toggle').removeClass('active');
        })
        $('.header-drop-toggle').on('click', function(e) {
            e.preventDefault();
            $(this).parent('.header-link.mod-mb').next('.header-drop-wrap').slideToggle();
            $(this).toggleClass('active')
        })
    }

    if ( $('.annoubar').length ) {
        const endTime = $('.annoubar').find('[data-annou-count=count]').text()

        function startCountdown(endTimeStr) {
            const endTime = new Date(endTimeStr);
            updateDay(endTime.getDate(), endTime.getMonth(), endTime.getFullYear())
            
            function updateCountdown() {
                const now = new Date().getTime();
                const distance = endTime.getTime() - now;
            
                if (distance < 0) {
                    clearInterval(interval);
                    return;
                }
            
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                updateCountdownTime(days, hours, minutes, seconds)
            }

            function updateCountdownTime(days, hours, minutes, seconds) {
                $('[data-annouce-bar=day]').html(days)
                $('[data-annouce-bar=hour]').html(hours)
                $('[data-annouce-bar=minute]').html(minutes)
                $('[data-annouce-bar=second]').html(seconds)
                if (lang == 'en') {
                    if (days > 1) $('[data-annouce-bar=day-txt]').html('days')
                    else $('[data-annouce-bar=day-txt]').html('day')

                    if (hours > 1) $('[data-annouce-bar=hour-txt]').html('hours')
                    else $('[data-annouce-bar=hour-txt]').html('hour')

                    if (minutes > 1) $('[data-annouce-bar=minute-txt]').html('minutes')
                    else $('[data-annouce-bar=minute-txt]').html('minute')
                    
                    if (seconds > 1) $('[data-annouce-bar=second-txt]').html('seconds')
                    else $('[data-annouce-bar=second-txt]').html('second')
                }
            }

            function updateDay(day, month, year) {
                let monthNames
                if (lang == 'en') {
                    monthNames = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                } else if (lang == 'vi') {
                    monthNames = [
                        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                    ];
                }
                $('[data-annouce-target=month]').html(monthNames[month])
                $('[data-annouce-target=year]').html(year)
            }
            
            const interval = setInterval(updateCountdown, 1000);
            updateCountdown();
        }

        startCountdown(endTime)
    }
    if ( $('.ctc-main-form').length ) {

        const data = {
            placeholder: lang == 'vi' ? "Cần hỗ trợ thêm" : 'Can you be more specific',
            dataRoomPreparation: lang == "vi" ? "Chuẩn bị Bộ hồ sơ Gọi vốn" : "Data room preparation",
            dealStructuring: lang == "vi" ? "Xây dựng và Tư vấn Cấu trúc Gọi vốn" : "Deal structuring & advisory",
            businessManagement: lang == "vi" ? "Tư vấn Quản trị Kinh doanh" : "Business Management",
            financialManagement: lang == "vi" ? "Tư vấn Quản trị Tài chính" : "Financial Management",
            peopleManagement: lang == "vi" ? "Tư vấn Quản trị Nguồn nhân lực" : "People Management",
            productDevelopment: lang == "vi" ? "Tư vấn Phát triển Sản phẩm" : "Product Development",
            marketing: lang == "vi" ? "Tư vấn Marketing" : "Marketing",
            innovationProgram: lang == "vi" ? "Tư vấn và Thực hiện Chương trình Đổi mới Sáng tạo" : "Innovation program consultation and implementation",
            professionalCompetency: lang == "vi" ? "Tư vấn, Xây dựng và Thực hiện các Chương trình Nâng cao Năng lực Chuyên môn" : "Professional competency enhancement programs consultation, building and implementation",

        }

        console.log('contact-page');
        //Setup 
        $('#ser-sub-2').val(null);
        $('#ser-sub-2').attr('disabled',true);
        $('#ser-sub-2').select2({
            placeholder: data.placeholder,
        });
        
        // On-change
        $('#ser-sub-1').on('change', function(e) {
            let value = $(this).val();
            if (value == 'Fund-raising Consulting') {
                updateSelect(0);
            } else if (value == 'Management Consulting') {
                updateSelect(1);
            } else if (value == 'Innovation consulting') {
                updateSelect(2);
            } else {
                updateSelect('none');
            }
        })

        function updateSelect(index) {
            if ($('#ser-sub-2').hasClass('select2-hidden-accessible')) {
                $('#ser-sub-2').select2('destroy')
                console.log('destroy')
            }
            
            $('#ser-sub-2 option').remove();
            
            if (index == 0) {
                console.log('first')
                $('#ser-sub-2').append(`<option value="Data room preparation">${data.dataRoomPreparation}</option>`);
                $('#ser-sub-2').append(`<option value="Deal structuring">${data.dealStructuring}</option>`);
            } else if (index == 1) {
                console.log('second')
                $('#ser-sub-2').append(`<option value="Business Management">${data.businessManagement}</option>`);
                $('#ser-sub-2').append(`<option value="Financial Management">${data.financialManagement}</option>`);
                $('#ser-sub-2').append(`<option value="People Management">${data.peopleManagement}</option>`);
                $('#ser-sub-2').append(`<option value="Product Development">${data.productDevelopment}</option>`);
                $('#ser-sub-2').append(`<option value="Marketing">${data.marketing}</option>`);
            } else if (index == 2) {
                console.log('third')
                $('#ser-sub-2').append(`<option value="Innovation program consultation and implementation">${data.innovationProgram}</option>`);
                $('#ser-sub-2').append(`<option value="Professional competency enhancement programs consultation, building and implementation">${data.professionalCompetency}</option>`);
            }

            if (index == 'none') {
                console.log('none')
                $('#ser-sub-2').attr('disabled',true);
            } else {
                console.log('not none')
                $('#ser-sub-2').removeAttr('disabled');
            }
            console.log('re init')
            $('#ser-sub-2').select2({
                placeholder: data.placeholder,
            });
        }
        //<option value="General enquiries" data-select2-id="select2-data-6-q77s">General enquiries</option>
    }

    if ( $('.scjob-hero').length) {
        console.log('job section')        
        // Handle file upload
        function uploadJobform() {
            const currentTextUpload = $('.txt-upload-link').clone().text();
            const maxAllowedSize = 10 * 1024 * 1024;

            $('[data-form="apply"]').on('click', function(e) {
                e.preventDefault();
                let jobTitle = $('.job-hero-title').text();
                $('.job-f-title').text(jobTitle);
                $('#Job-Title').val(jobTitle);
    
                $('body').addClass('on-nav-open')
                $('.overlay-wrap').addClass('active');
            })
    
            $('.form-close-ic').on('click', function(e) {
                e.preventDefault();
                $('body').removeClass('on-nav-open');
                $('.overlay-wrap').removeClass('active');
                $('.job-form-inner').get(0).reset();
                $('.w-form-done').css('display','none');
                $('.job-form-inner').css('display','block');
                resetUploadFile();
            })

            $('.upload-link').on('click', function(e) {
                e.preventDefault();
                $('.input-file').trigger('click');
            })

            $('.input-file').change(function() {
                const localFile = $(this).get(0).files[0];
                console.log(localFile);
                if (localFile) {
                    if (localFile.size >= maxAllowedSize) {
                        alert('Maximum allowed size file is 10MB');
                    } else {
                        $('.ic-upload-link').removeClass('hidden');
                        $('.upload-cancel').addClass('hidden');
                        $('.txt-upload-link').text('Uploading...');
                    
                        uploadFile(localFile, 'career').then((a) => {
                            console.log(a);
                            $('.ph-file-url').val(a.url)
                            doneUploadFile(localFile);
                        })
                    }
                }
            })

            function doneUploadFile(ele) {
                $('.txt-upload-link').text(shortedFileName(ele.name));
                $('.ic-upload-link').addClass('hidden');
                $('.upload-cancel').removeClass('hidden');
            }

            function shortedFileName(name, size = 16) {
                const splitFile = name.split('.');
                function truncate(source, size) {
                    return source.length > size ? source.slice(0, size - 1) + "…" : source;
                }
                return `${truncate(splitFile[0], size)}.${splitFile[1]}`;
            }

            $('.upload-cancel').on('click', function(e) {
                e.preventDefault();
                resetUploadFile();
            })

            function resetUploadFile() {
                $('.ph-file-url').val('');
                $('.txt-upload-link').text(currentTextUpload);
                $('.ic-upload-link').removeClass('hidden');
                $('.upload-cancel').addClass('hidden');
            }
        }
        uploadJobform();

        function uploadFile(file, folder) {
            // https://script.google.com/macros/s/AKfycbzcNcsf-T-rOrgB7VY8ao0B-TD9gQIXn0ceVuDrmc_L7PFHIjT4VeFWz3w2KYFrgFen/exec

            const idScript = 'AKfycbzcNcsf-T-rOrgB7VY8ao0B-TD9gQIXn0ceVuDrmc_L7PFHIjT4VeFWz3w2KYFrgFen'
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
                        .then(res => res.json())
                        .then((a) => {
                            res(a)
                        }).catch(e => rej(e))
                }
            })
        }

    }

    if ( $('.scebc-goal').length) {
        const handleActiveGoalBuild = {
            active: (idx) => {
                const blockTargets = $('.ebc-goal-build-block')
                const valueTargets = $('.ebc-goal-build-value-item')

                blockTargets.removeClass('active')
                blockTargets.eq(idx).addClass('active')

                valueTargets.removeClass('active')
                valueTargets.eq(idx).addClass('active')
            },
            deactive: () => {

            }
        }
        if ( $(window).width() > 991 ) {
            $('.ebc-goal-build-block').on('pointerenter', function(e) {
                handleActiveGoalBuild.active($(e.currentTarget).index())
            })
        } else {
            $('.ebc-goal-build-block').on('click', function(e) {
                handleActiveGoalBuild.active($(e.currentTarget).index())
            })
        }
  
        handleActiveGoalBuild.active(0)
    }

    if ( $('.scebc-prog').length ) {
        const handleActiveProgramTraining = {
            active: (idx) => {
                const headTargets = $('.ebc-prog-training-item')
                const bodyTargets = $('.ebc-prog-training-content-item')

                headTargets.removeClass('active').eq(idx).addClass('active')

                $('.ebc-prog-training-item-head').removeClass('active')
                headTargets.eq(idx).find('.ebc-prog-training-item-head').addClass('active')

                bodyTargets.removeClass('active').eq(idx).addClass('active')

            },
            deactive: () => {

            }
        }

        $('.ebc-prog-training-item-head').on('click', function(e) {
            let indexActive = $(this).parents('.ebc-prog-training-item').index()
        
            if (!$(this).hasClass('active')) handleActiveProgramTraining.active(indexActive)
        })
        handleActiveProgramTraining.active(0)
    }
    
    if ( $('.scebc-mentor').length) {
        // const itemTargets = $('.ebc-mentor-main')
        // const titleTargets = itemTargets.find('[data-ebc-industry]')

        // const handleFilter = () => {
        //     const item = $('.ebc-mentor-filter-item').eq(0).clone()
        //     $('.ebc-mentor-filter-item').remove()

        //     titleTargets.each((idx, el) => {
        //         $(el).parents('.ebc-mentor-main').attr('data-mentor-filter', `${$(el).html()}`)

        //         const cloner = item.clone()
        //         $(cloner).find('.ebc-mentor-filter-item-txt').text($(el).html())
        //         $(cloner).attr('data-mentor-filter', `${$(el).html()}`)
        //         $('.ebc-mentor-filter').append(cloner)
        //     })
        // }
        // handleFilter()

        // const hanldeActiveMentor = {
        //     active: (filter) => {
        //         itemTargets.removeClass('active')
        //         $(`.ebc-mentor-main[data-mentor-filter="${filter}"]`).addClass('active')
        //         $('.ebc-mentor-filter-item').removeClass('active')
        //         $(`.ebc-mentor-filter-item[data-mentor-filter="${filter}"]`).addClass('active')

        //     },
        //     deactive: () => {
                
        //     },
        // }

        // $('.ebc-mentor-filter-item').on('click', function(e) {
        //     e.preventDefault()
        //     hanldeActiveMentor.active($(this).attr('data-mentor-filter'))
        // })

        // hanldeActiveMentor.active($('.ebc-mentor-filter-item').attr('data-mentor-filter'))
        $('.ebc-mentor-filter-item').eq(0).addClass('active');
        fillterBlog('Trainer/Speaker');
        $('.ebc-mentor-filter-item').on('click', function(){
            let dataAttr = $(this).attr('data-filter-tab');
            $('.ebc-mentor-filter-item').removeClass('active');
            $(this).addClass('active');
            fillterBlog(dataAttr);
        })
        function fillterBlog(dataAttr) {
            let allItem = $('.ebc-mentor-main-inner-item');
            $('.ebc-mentor-main-inner-item').removeClass('active');
            allItem.each((idx, item) => {
                let arrAttr = [];
                $(item).find('.ebc-mentor-main-inner-item-cate').each((idx, subItem) => {
                    let txt = $(subItem).text();
                    arrAttr.push(txt);
                });
                if (arrAttr.includes(dataAttr)) {
                    $(item).fadeIn(300);
                } else {
                    $(item).hide();
                }
            });
        }
        
    }

    if ( $('.scebc-faq').length ) {
        handleAccor('.accor-list.ebc-faq-list')
    }
//    setTimeout(function(){
//     $('.ebc-prog-training-item-content').each((idx, item) => {
//         let height =$(item).find('.ebc-prog-training-item-sub').outerHeight(true);
//         $(item).css('--height-translate', `${height}px`);
//      })
//    },2000)
};

$(document).ready(function() {
    mainScript();
})
document.fonts.ready.then(() => {
    $('.ebc-prog-training-item-content').each((idx, item) => {
        let height = $(item).find('.ebc-prog-training-item-sub').outerHeight(true);
        $(item).css('--height-translate', `${height}px`);
    });
});