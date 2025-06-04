const validDomain = ["126.com",
    "163.com",
    "21cn.com",
    "alice.it",
    "aliyun.com",
    "aol.com",
    "aol.it",
    "arnet.com.ar",
    "att.net",
    "bell.net",
    "bellsouth.net",
    "bk.ru",
    "blueyonder.co.uk",
    "bol.com.br",
    "bt.com",
    "btinternet.com",
    "charter.net",
    "comcast.net",
    "cox.net",
    "daum.net",
    "earthlink.net",
    "email.com",
    "email.it",
    "facebook.com",
    "fastmail.fm",
    "fibertel.com.ar",
    "foxmail.com",
    "free.fr",
    "games.com",
    "globo.com",
    "globomail.com",
    "gmail.com",
    "gmx.com",
    "gmx.de",
    "gmx.fr",
    "gmx.net",
    "googlemail.com",
    "hanmail.net",
    "hotmail.be",
    "hotmail.ca",
    "hotmail.co.uk",
    "hotmail.com",
    "hotmail.com.ar",
    "hotmail.com.br",
    "hotmail.com.mx",
    "hotmail.de",
    "hotmail.es",
    "hotmail.fr",
    "hotmail.it",
    "hush.com",
    "hushmail.com",
    "icloud.com",
    "ig.com.br",
    "iname.com",
    "inbox.com",
    "inbox.ru",
    "juno.com",
    "keemail.me",
    "laposte.net",
    "lavabit.com",
    "libero.it",
    "list.ru",
    "live.be",
    "live.co.uk",
    "live.com",
    "live.com.ar",
    "live.com.mx",
    "live.de",
    "live.fr",
    "live.it",
    "love.com",
    "mac.com",
    "mail.com",
    "mail.ru",
    "me.com",
    "msn.com",
    "nate.com",
    "naver.com",
    "neuf.fr",
    "ntlworld.com",
    "oi.com.br",
    "online.de",
    "orange.fr",
    "orange.net",
    "outlook.com",
    "outlook.com.br",
    "pobox.com",
    "poste.it",
    "prodigy.net.mx",
    "protonmail.ch",
    "protonmail.com",
    "qq.com",
    "r7.com",
    "rambler.ru",
    "rocketmail.com",
    "rogers.com",
    "safe-mail.net",
    "sbcglobal.net",
    "sfr.fr",
    "shaw.ca",
    "sina.cn",
    "sina.com",
    "sky.com",
    "skynet.be",
    "speedy.com.ar",
    "sympatico.ca",
    "t-online.de",
    "talktalk.co.uk",
    "telenet.be",
    "teletu.it",
    "terra.com.br",
    "tin.it",
    "tiscali.co.uk",
    "tiscali.it",
    "tuta.io",
    "tutamail.com",
    "tutanota.com",
    "tutanota.de",
    "tvcablenet.be",
    "uol.com.br",
    "verizon.net",
    "virgilio.it",
    "virgin.net",
    "virginmedia.com",
    "voo.be",
    "wanadoo.fr",
    "web.de",
    "wow.com",
    "ya.ru",
    "yahoo.ca",
    "yahoo.co.id",
    "yahoo.co.in",
    "yahoo.co.jp",
    "yahoo.co.kr",
    "yahoo.co.uk",
    "yahoo.com",
    "yahoo.com.ar",
    "yahoo.com.br",
    "yahoo.com.mx",
    "yahoo.com.ph",
    "yahoo.com.sg",
    "yahoo.de",
    "yahoo.fr",
    "yahoo.it",
    "yandex.by",
    "yandex.com",
    "yandex.kz",
    "yandex.ru",
    "yandex.ua",
    "yeah.net",
    "ygm.com",
    "ymail.com",
    "zipmail.com.br",
    "zoho.com",
    "@online.de",
    "@web.de",
    "@icloud.com"
]
function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

function isVavlidNumber(phoneNumber) {
    const regex = /^\+?\d{10,}$/;
    return regex.test(phoneNumber);
}

const checkValidation = () => {
    $('.bp-hack-btn-submit').on('click', function (e) {
        e.preventDefault();
        let email = $(this).closest('form').find('.bp-valid-domain').val();
        // let number = $('.bp-valid-number').val();
        let emailDomain = email.split('@')[1];
        if (emailDomain) {
            emailDomain = emailDomain.toLowerCase();
        }

        let errors = {
            emailDomain: {
                type: 'emailDomain',
                isValid: false,
                messageEl: $(this).closest('form').find('.company-email-message')
            },
            // email: {
            //     type: 'email',
            //     isValid: false,
            //     messageEl: $('.bp-contact-email-message')
            // },
            // number: {
            //     type: 'number',
            //     isValid: false,
            //     messageEl: $('.company-number-message')
            // }
        };

        if ($.inArray(emailDomain, validDomain) !== -1 || !isValidEmail(email)) {
            errors['emailDomain'].isValid = false
        } else {
            errors['emailDomain'].isValid = true
        }

        // if (!isValidEmail(email)) {
        //     errors['email'].isValid = false
        // } else {
        //     errors['email'].isValid = true
        // }

        // if (!isVavlidNumber(number)) {
        //     errors['number'].isValid = false
        // } else {
        //     errors['number'].isValid = true
        // }

        // Show/hide error messages based on validation result
        for (let key in errors) {
            if (!errors[key].isValid) {
                errors[key].messageEl.show(300);
            } else {
                errors[key].messageEl.hide(300);
            }
        }
        // If all fields are valid, submit the form
        if (Object.values(errors).every(error => error.isValid)) {
            $('.company-email-message').hide(300);
            $('.bp-contact-email-message').hide(300);
            $('.company-number-message').hide(300);
            console.log("Form is valid, submitting...");
            $(this).closest('form').submit();
        }
    })
    $('.bp-valid-number').on('input', function (e) {
        let number = $(this).val();
        if (!isVavlidNumber(number)) {
            $(this).val($(this).val().replace(/[^0-9+]/g, ''));
        }
    });
    function checkLang() {
        var lang = $('html').attr('lang'); 
        
        if (lang === 'de') {
          $('#checklist-fr').hide();
          $('#checklist-de').show(); 
        } else {
          $('#checklist-de').hide();
          $('#checklist-fr').show(); 
        }
      
        requestAnimationFrame(checkLang); 
      }
      requestAnimationFrame(checkLang);

}
checkValidation();
