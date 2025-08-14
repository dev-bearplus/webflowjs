const mainScript = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                $.getJSON("https://nominatim.openstreetmap.org/reverse", {
                    lat: lat,
                    lon: lon,
                    format: "json"
                }, function(data) {
                    if (data && data.address && data.address.country) {
                        var countryCode = data.address.country_code.toLowerCase(); 
                        console.log(data.address)
                        if (countryCode === "id") {
                            $(".bp-popup").addClass("active");
                        }
                    } else {
                        console.log("Không lấy được thông tin quốc gia.");
                    }
                });
            },
            function(error) {
                console.error("Lỗi lấy vị trí:", error.message);
            }
        );
    } else {
        console.log("Trình duyệt không hỗ trợ Geolocation");
    }
    $('.bp-popup-close').on('click', function() {
        $('.bp-popup').removeClass('active')
    })
};
window.onload = mainScript;
