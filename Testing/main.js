gsap.registerPlugin(Flip)

//let itemImg;

// const transitionLeavePage = (data) => {
//     const currentContainer = data.current.container;
//     const tl = gsap.timeline();
//     tl.to(currentContainer, { autoAlpha: 1 })
//     itemImg = document.querySelector('.item-img')
//     document.querySelector('.clipboard').append(itemImg);
//     return tl;
// };

// const transitionEnterPage = (data) => {
//     const nextContainer = data.next.container;
//     const tl = gsap.timeline();
//     tl.from(nextContainer, { autoAlpha: 1 });
//     let newItemImg = document.querySelector('.clipboard .item-img');
//     let state = Flip.getState(newItemImg)
//     document.querySelector('.container').append(newItemImg);
//     console.log(newItemImg)
//     Flip.from(state, {
//         duration: 2,
//     })
//     return tl;
// };

// barba.init({
//     sync: true,
//     timeout: 5000,
//     debug: true,
//     transitions: [
//         {
//             once(data) {
//             },
//             async afterLeave(data) {
//                 //when leave
//                 const done = this.async();

//                 const tlafter = transitionLeavePage(data);
//                 tlafter.then(() => {
//                     done();
//                 });
//             },
//             async enter(data) {
//                 //when enter
//                 const tlEnter = transitionEnterPage(data);

//             }
//         },
//     ],
//     views: [
//     ],
// });
let lastIndex;
$('.homepage .item-wrap').on('click', (e) => {
    e.preventDefault();
    let img = $(e.target).find('.item-img');
    let full = $('.full');
    let stateImg = Flip.getState(img);
    full.append(img);
    //let stateTitle = Flip.getState($(e.target).find('.item-title'));
    Flip.from(stateImg, { duration: .5, ease: "power1.inOut", absolute: true });
    $('.full').addClass('show');
    lastIndex = $(e.target).index();
    console.log(lastIndex);
    window.history.replaceState(null, null, "/Testing/project-detail");
    $('.full.show .item-img').on('click', (e) => {
        e.preventDefault();
        let lastItem = $('.item-wrap').eq(lastIndex);
        lastItem.css('zIndex', '99')
        console.log(lastItem)
        let curState = Flip.getState($(e.target));
        $(e.target).insertBefore(lastItem.find('.item-title'))
        Flip.from(curState, { duration: .5, ease: "power1.inOut", absolute: true })
        setTimeout(() => {
            lastItem.css('zIndex', '0')
        }, 500)
        $('.full').removeClass('show');
        window.history.replaceState(null, null, "/Testing");
        window.history.pushState(null, null, "/Testing");
    })
    $(window).onpopstate
})
