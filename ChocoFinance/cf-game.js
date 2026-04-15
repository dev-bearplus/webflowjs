document.addEventListener('DOMContentLoaded', () => {
    const introWrap = document.querySelector('.intro-wrap');
    if (introWrap) {
        introWrap.classList.add('loaded');
    }

    // Countdown timer
    var $comingHero = $('.coming-hero');
    if ($comingHero.length) {
        var endDateStr = $comingHero.data('end').replace(',', '');
        var endDate = new Date(endDateStr).getTime();
        console.log('endDate', endDate);

        function updateTimer() {
            var now = new Date().getTime();
            var distance = endDate - now;
            console.log('distance', distance);
            if (distance <= 0) {
                $('[data-time="days"]').text('00');
                $('[data-item="hours"]').text('00');
                $('[data-time="minutes"]').text('00');
                $('[data-time="seconds"]').text('00');
                return;
            }
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $('[data-time="days"]').text(String(days).padStart(2, '0'));
            $('[data-item="hours"]').text(String(hours).padStart(2, '0'));
            $('[data-time="minutes"]').text(String(minutes).padStart(2, '0'));
            $('[data-time="seconds"]').text(String(seconds).padStart(2, '0'));
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }
});