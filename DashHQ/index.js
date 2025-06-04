const script = () => {
    function socialShare() {
        const url = window.location.href;
        $('.social-media-icon').each((_, icon) => {
            icon.setAttribute('target', '_blank');
            switch (icon.getAttribute('data-share')) {
                case 'linkedin': icon.setAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${url}`); break;
                case 'facebook': icon.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${url}`); break;
                case 'x': icon.setAttribute('href', `https://x.com/intent/tweet?url=${url}`); break;
                default: break;
            }
        });
        $('.category-link').each((idx, link) => {
            $(link).on('click', (e) => {
                $('.category-link').removeClass('active');
                $(link).addClass('active');
                $('.blog-cms-item').removeClass('active')
                $('.blog-cms-item').eq(idx).addClass('active');
            });
        });
    }
    socialShare();
}
window.onload = script;