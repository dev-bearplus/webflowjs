const home = () => {
    console.log('homeeeee 👉️');
    return;
    // const select = e => document.querySelector(e);
    // const selectAll = e => document.querySelectorAll(e);

    // const track = select(".slide-img-track");

    // const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

    // const handleOnUp = () => {
    //     track.dataset.mouseDownAt = "0";
    //     track.dataset.prevPercentage = track.dataset.percentage;
    // }

    // const handleOnMove = (e) => {
    //     if (track.dataset.mouseDownAt === "0") return;

    //     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    //     const maxDelta = window.innerWidth / 2;

    //     const percentage = (mouseDelta / maxDelta) * -100;
    //     const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    //     const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    //     track.dataset.percentage = nextPercentage;
    //     track.style.transform = `translate(${nextPercentage}%, -50%)`;

    //     for (const image of selectAll(".slide-img-track-item")) {
    //         image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    //     }
    //     track.animate({ transform: `translate(${nextPercentage}%, -50%)` }, { duration: 1200, fill: "forwards" });

    //     for (const image of selectAll(".slide-img-track-item")) {
    //         image.animate({ objectPosition: `${100 + nextPercentage}% center` }, { duration: 1200, fill: "forwards" });
    //     }
    // }

    // window.onmousedown = (e) => handleOnDown(e);
    // window.ontouchstart = (e) => handleOnDown(e.touches[0]);

    // window.onmouseup = (e) => handleOnUp(e);
    // window.ontouchend = (e) => handleOnUp(e.touches[0]);

    // window.onmousemove = (e) => handleOnMove(e);
    // window.ontouchmove = (e) => handleOnMove(e.touches[0]);
}
export default home;