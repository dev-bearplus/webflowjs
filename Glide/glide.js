const mainScript = () => {
    function checkLocation() {
        if (sessionStorage.getItem("popupShown") === "true") {
            return;
        }
        console.log(sessionStorage.getItem("popupShown"));
    
        $.getJSON("https://ipapi.co/json/?key=MQpEwzeaXMdKhgiWlw1dUbaA4BODdDwMtQAVfusqgxhxBW3SWh", function(data) {
            if (data && data.country_code) {
                var countryCode = data.country_code.toLowerCase();
                console.log(data);
    
                if (countryCode === "id") { // Indonesia
                    sessionStorage.setItem("popupShown", "true");
                    $(".bp-popup").addClass("active");
                }
            } else {
                console.log("Không lấy được thông tin quốc gia.");
            }
        }).fail(function() {
            console.log("Lỗi gọi ipapi");
        });
    }
    
    checkLocation();    
    $('.bp-popup-close').on('click', function() {
        $('.bp-popup').removeClass('active')
    })
};
window.onload = mainScript;
