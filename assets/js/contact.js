const form = document.querySelector("form")
const button = document.querySelector("form button")
const URL = "https://exam-one.bjorno.dev/wp-json/contact-form-7/v1/contact-forms/130/feedback"
let timeout = null

const getFormFields = () => [
    form["your-name"],
    form["your-email"],
    form["your-subject"],
    form["your-message"],
]

const required = (target) => (target.value.trim()) ? true : false;

const minLength = (target, length) => (target.value.trim().length >= length) ? true : false

const validEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patternMatches = regEx.test(email.value)
    return patternMatches
}

const validForm = (form) => {
    const [name, email, subject, message] = getFormFields()
    const arr = [
        minLength(name, 5),
        validEmail(email),
        minLength(subject, 15),
        minLength(message, 25),
    ]

    const passesValidation = arr.every(el => el)
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

const isValid = (formItemName) => {
    const [name, email, subject, message] = getFormFields()
    const formItem = form[formItemName]
    switch (formItemName) {
        case name.name:
            return minLength(formItem, 5)
        case email.name:
            return validEmail(formItem)
        case subject.name:
            return minLength(formItem, 15)
        case message.name:
            return minLength(formItem, 25)
        default:
            return false
    }
}

const handleValidate = (e) => {
    const name = e.target.name

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => (!isValid(name)) && setErrorStyles(e), 1000)

    if (isValid(name)) removeErrorStyles(e)

    button.disabled = !validForm(form)
}

const handleSubmit = async (e) => {
    const status = document.querySelector(".form-status-message")
    const body = new FormData(form)

    const res = await fetch(URL, { method: "POST", body })
    const json = await res.json()

    if (json.status === "mail_sent") {
        status.classList.add("success")
        status.innerHTML = "Your message was successfully sent!"
    } else {
        status.classList.add("has-error")
        status.innerHTML = `Error: ${json.message}`
    }

    setTimeout(() => {
        status.classList.remove("success")
        status.classList.remove("has-error")
    }, 5000)

    return json
}

form.addEventListener("input", handleValidate)

button.addEventListener("click", handleSubmit)