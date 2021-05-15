import {html} from "../base.js";

const renderError = (errorEl, errorMessage) => {
    errorEl.textContent = errorMessage;
    errorEl.style.visibility = "visible";

    return errorEl;
}

const removeErrors = form => Array.from(form.querySelectorAll(".error-field"))
    .forEach(curErrorEl => curErrorEl.style.visibility = "hidden");

const errors = {
    folderName: [
        {regEx: "^.{3,}$", errorMessage: "Foldername must be atleast 3 characters"},
        {regEx: "^.{3,15}$", errorMessage: "Foldername must be less than 15 characters"},
    ],
    url: [{
        regEx: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
        errorMessage: "Wrong URL"
    }],
    folderSelector: [
        {regEx: "^((?!default).)*$", errorMessage: "Please select a folder"},
    ]
}

const hasMatch = (regEx, value) => value.match(regEx);

const renderErrors = (...inputs) => {
    return inputs.filter((curInput) => {
        const {id, value} = curInput

        const error = errors[id].find(({regEx}) => hasMatch(regEx, value.trim()) === null);
        if (error) {
            return renderError(curInput.nextElementSibling, error.errorMessage);
        }
    })
}

export {
    renderError,
    renderErrors,
    removeErrors,
};