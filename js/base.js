const html = {
    sectionAdded: () => document.querySelector(".section-added"),
    sectionFolders: () => document.querySelector(".section-folders .wrapper"),
    sectionForms: () => document.querySelector(".section-forms"),
    formAddURL: () => document.querySelector(".form--add-url"),
    formAddFolder: () => document.querySelector(".form--add-folder"),
    selectField: () => document.getElementById("folderSelector"),
    allErrorEl: () => document.querySelectorAll(".error-field"),
    ctaCloseForms: () => document.querySelector(".close-forms"),
    ctaMainAddBookmark: () => document.querySelector(".cta--add-bookmark"),
}

const getInputFields = form => {
    return Array.from(form).filter(curInput => !curInput.classList.contains("cta"));
}

const removeElement = element => element.remove();

const removeTitle = titleEl => {
    setTimeout(() => titleEl.style.display = "none", 1500);
}

export {
    html,
    getInputFields,
    removeElement,
    removeTitle,
};