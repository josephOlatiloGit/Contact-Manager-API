const firstname = document.getElementById("username");
// const surname = document.getElementById("surname");
// const dropDown = document.getElementById("drop-down");
// const dial = document.getElementById("dial");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");
const passValid = document.getElementById("passValid");
const passwordError = document.getElementById("passError");
const confirmValid = document.getElementById("conValid");
const confirmPasswordError = document.getElementById("conPassError");
const submitButton = document.getElementById("btn-sub");
const form = document.getElementById("parent");



firstname.addEventListener("keyup", function (e) {
    validateName(firstname);
});

function validateName(field) {
    const name = field.value;
    console.log(name);
    if (!name.match(/^[A-Za-z][a-zA-Z]{3,30}$/)) {
        console.log("can't be less than 3 characters");
        updateElementStyle(field, "invalid");
        return false;
    }
    updateElementStyle(field, "valid");
    return true;
}

function updateElementStyle(field, action) {
    if (action == "valid") {
        field.style.borderWidth = "3px";
        field.style.borderColor = "green";
        return;
    }
    if (action == "invalid") {
        field.style.borderWidth = "3px";
        field.style.borderColor = "red";
        return;
    }
}


email.addEventListener("keyup", function (e) {
    validateEmail();
});

function validateEmail() {
    const mail = email.value;
    if (!mail.match(/^[a-zA-Z][a-zA-Z0-9\.\-_]+@[a-z]+\.[a-z]{2,5}$/)) {
        updateElementStyle(email, "invalid");
        return false;
    }
    updateElementStyle(email, "valid");
    return true;
}


password.addEventListener("keyup", function (e) {
    validatePassword(password, passwordError);
});

confirmPassword.addEventListener("keyup", function (e) {
    const valid = validatePassword(confirmPassword, confirmPasswordError);
    if (valid == true) {
        passwordMatch();
    }
});

function validatePassword(field, errorfiled) {
    const pword = field.value;
    if (pword.length < 8) {
        updateElementStyle(field, "invalid");
        updatePasswordMessage("Must contain at least 8 characters", "invalid", errorfiled);
        return false;
    }

    if (pword.match(/["'():<>\[\]^`{-~]/)) {
        updateElementStyle(field, "invalid");
        updatePasswordMessage("Invalid Symbol! <br> Must contain any of the <br> permitted symbols (!@#$&*-_+ ?/=.,;)", "invalid", errorfiled);

        return false;
    }

    if (!pword.match(/[A-Z]/)) {
        updateElementStyle(field, "invalid");
        updatePasswordMessage(
            "Must contain at least 1 uppercase character", "invalid", errorfiled);
        return false;
    }

    if (!pword.match(/[a-z]/)) {
        updateElementStyle(field, "invalid");
        updatePasswordMessage(
            "Must contain at least 1 lowercase character", "invalid", errorfiled);
        return false;
    }

    if (!pword.match(/[0-9]/)) {
        updateElementStyle(field, "invalid");
        updatePasswordMessage("Missing 1 numeric character", "invalid", errorfiled);
        return false;
    }

    if (!pword.match(/[_\\?@=;*-/! #-&]/)) {
        updateElementStyle(field, "invalid");
        updatePasswordMessage("Must contain at least 1 Special character: <br/> (!@#$&*-_+ ?/=.,;)", "invalid", errorfiled);
        return false;
    }

    updateElementStyle(field, "valid");
    updatePasswordMessage("", "valid", errorfiled);
    return true;
}

function passwordMatch() {
    const pass = password.value;
    const conpass = confirmPassword.value;
    if (pass != conpass) {
        updateElementStyle(confirmPassword, "invalid");
        confirmPasswordError.style.display = "flex";
        confirmPasswordError.innerHTML = "Password doesn't match";
        return false;
    }
    updateElementStyle(confirmPassword, "valid");
    confirmPasswordError.style.display = "none";
    confirmPasswordError.innerHTML = "";

    return true;
}



function updatePasswordMessage(message, status, act) {
    if (status == "valid") {
        act.style.display = "none";
        act.innerHTML = "";
        return;
    }
    act.style.display = "flex";
    act.innerHTML = message;
}

// submitButton.addEventListener("click", function (e) {
//     e.preventDefault()
//     if (false

//     ) {
//         alert("Form validation failed");
//         return
//     }

//     alert("valid");

//     fetch("http://localhost:5001/signup", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8"
//         },
//         body: JSON.stringify({
//             firstname: firstname.value,
//             // lastname: surname.value,
//             // Phone: dial,
//             // countryCodes: dropDown.value,
//             email: email.value,
//             password: password.value
//         }),
//     }).then((res) => {
//         console.log(res)
//         // res.json().then(e=>console.log(e))
//         if (res.status != 200) {
//             alert("Registration Failed")
//             return
//         }
//         window.location.href = "/signup.html"
//     }).catch(e => {
//         console.log(e)
//     })

//     console.log("After Fetch")

// })



