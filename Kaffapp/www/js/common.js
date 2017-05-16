
// Validation functions
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    // To check a password between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter
    // Ref: http://www.w3resource.com/javascript/form/password-validation.php
    var passw = /^[A-Za-z0-9]\w{7,20}$/;
    return passw.test(password);
}
