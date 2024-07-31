function validateEmail(email) {
    const mail = email
    if (!mail.match(/^[a-zA-Z][a-zA-Z0-9\.\-_]+@[a-z]+\.[a-z]{2,5}$/)) {
        return false
    }
    return true;
}

function validatePassword(value) {
    let pword = value;
    if (pword.length < 8) {
        return { valid: false, msg: " Password Must be more than 7 characters" };
    }

    if (pword.match(/["'():<>\[\]^`{-~]/)) {
        return { valid: false, msg: " Password Must contain valid character" };
    }

    if (!pword.match(/[A-Z]/)) {
        return { valid: false, msg: " Password Must contain one upper case character" };
    }

    if (!pword.match(/[a-z]/)) {
        return { valid: false, msg: " Password Must contain a lower case character" };
    }

    if (!pword.match(/[0-9]/)) {
        return { valid: false, msg: "Password Must contain a number" };
    }

    if (!pword.match(/[_\\?@=;*-/! #-&]/)) {
        return { valid: false, msg: "Password is missing one special character" };
    }

    return { valid: true, msg: "Valid" };
}

//  export default validatePassword;
module.exports = { validateEmail, validatePassword }