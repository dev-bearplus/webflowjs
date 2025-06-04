const splitTextFadeUpSetup = (className) => {
    const splitTextItem = new SplitText(className, { type: 'lines, words', linesClass: "splittext-lines" });
    gsap.set(splitTextItem.lines, { overflow: 'hidden' });
    // gsap.set(splitTextItem.words, { yPercent: options.yPercent });
    // gsap.set(className, { autoAlpha: 1 });
    return splitTextItem;
}

const waveAnimSetup = (waveOptions) => {
    const { waveItem, waveWrap, waveCount, waveDelay } = waveOptions;
    let wave = $(waveItem).eq(0).clone();

    $(waveWrap).html("");
    for (let i = 0; i < waveCount; i++) {
        let html = wave.clone();
        let itemDelay = -waveDelay / waveCount;
        html.css("animation-delay", `${itemDelay * i}s`);
        $(waveWrap).append(html);
    }
}

export { splitTextFadeUpSetup, waveAnimSetup }