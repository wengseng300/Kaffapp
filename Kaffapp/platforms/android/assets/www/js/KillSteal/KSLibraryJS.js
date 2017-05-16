
    /* Validator Fuctions */
    var KSJSValidator = {
        // Validate null or empty string
        NotNullOrEmpty: function (val) {
            return (val !== null && val !== '' && typeof (val) !== 'undefined');
        },

        // Normal password. 
        // Format: Between 7 to 50 length. 
        // Example: abcdefg
        KSValidateNormalPassword: function (val) {
            var passw = /^[A-Za-z]\w{7,50}$/;
            return passw.test(val);
        },
        // Normal strict password. 
        // Format: Between 7 to 50 length. Must contain alphabets & numbers 
        // Example: abcdefg123
        KSValidateNormalStrictPassword: function (val) {
            var validator = /^[A-Za-z0-9]\w{7,50}$/;
            return validator.test(val);
        },

        // Strong strict password. 
        // Format: Between 7 to 50 length. Must contain alphabets, numbers & symbols
        // Example: abcdefg123$%&
        KSValidateStrongPassword: function (val) {

        },

        // Strong strict password. 
        // Format: Between 7 to 50 length. Must contain alphabets, numbers, symbols and uppercase character
        // Example: ABCdefg123$%&
        KSValidateStrongStrictPassword: function (val) {

        },

        // Validate E-mail Address
        // Format: Normal e-mail format
        // Example: admin@hotmail.com
        KSValidateEmail: function (val) {
            var validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return validator.test(val);
        }
    };

    var KSJSCrypto = {
        /* Encryption/Decryption Function */
        KSAESEncrypt: function (val, key) {
            return CryptoJS.AES.encrypt(val, key);
        }
    };