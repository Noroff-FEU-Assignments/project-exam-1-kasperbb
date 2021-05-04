const form = document.querySelector("form")
const button = document.querySelector("form button")
let timeout = null

const required = (target) => (target.value.trim()) ? true : false;

const minLength = (target, length) => (target.value.trim().length >= length) ? true : false

const validEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patternMatches = regEx.test(email.value);
    return patternMatches;
}

const validForm = (form) => {
    let arr = [
        minLength(form["your-name"], 5),
        validEmail(form["email"]),
        minLength(form["subject"], 15),
        minLength(form["message"], 25),
    ];

    const passesValidation = arr.every(el => el);
    return passesValidation;
}

const setErrorStyles = (e) => {
    const parent = e.target.parentNode
    parent.classList.add("has-error")
}

const removeErrorStyles = (e) => {
    const parent = e.target.parentNode
    parent.classList.remove("has-error")
}

const isValid = (name) => {
    const formItem = form[name]
    switch (name) {
        case 'your-name':
            return minLength(formItem, 5)
        case 'email':
            return validEmail(formItem)
        case 'subject':
            return minLength(formItem, 15)
        case 'message':
            return minLength(formItem, 25)
        default:
            return false
    }
}


form.addEventListener("input", (e) => {
    const name = e.target.name

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => (!isValid(name)) && setErrorStyles(e), 1000)

    if (isValid(name)) removeErrorStyles(e)

    button.disabled = !validForm(form)
})