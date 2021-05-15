import {html, getInputFields, removeElement, removeTitle} from "./base.js";
import {renderError, renderErrors, removeErrors} from "./views/errorsView.js";
import Folders from "./models/Folders.js";
import Folder from "./models/Folder.js";
import {removeFolderFromUI, renderFolder, renderFolderOption, renderFolders} from "./views/foldersView.js";
import {renderBookmark, renderBookmarks, renderBookmarksArrow} from "./views/bookmarksView.js";

const state = {};

// Handlers
const formAddFolderSubmitHandler = evt => {
    evt.preventDefault();
    const $target = evt.target;
    removeErrors($target);

    const inputs = getInputFields($target);

    if (renderErrors(inputs[0]).length !== 0) return;

    if (state.folders.getFolder(inputs[0].value.trim())) {
        renderError(inputs[0].nextElementSibling, "There is already folder with that name");

        return;
    }

    const folder = new Folder(inputs[0].value.trim());
    state.folders.add(folder);
    renderFolder(folder.name);
    renderFolderOption(folder.name);
    html.sectionAdded().style.display = "flex";
    removeTitle(html.sectionAdded());
}

const sectionFoldersClickHandler = evt => {
    const $target = evt.target;

    if ($target.classList.contains("folder__remove-icon")) {
        const folderName = $target.dataset.name;
        state.folders.remove(folderName);
        removeFolderFromUI($target.parentElement);
        removeElement(document.querySelector(`option[value*="${folderName}"]`))
    }

    if ($target.classList.contains("bookmarks__remove-icon")) {
        const bookmarkURL = $target.nextElementSibling.href;
        const folderName = $target.parentElement.parentElement.dataset.id;
        const folder = state.folders.getFolder(folderName);
        folder.removeBookmark(bookmarkURL);
        removeElement($target.parentElement);
        state.folders.writeStorage();
    }
}

const formAddURLSubmitHandler = evt => {
    evt.preventDefault();
    const $target = evt.target;

    removeErrors($target);

    const inputs = getInputFields($target);

    if (renderErrors(...inputs).length !== 0) return;

    const url = inputs[0].value;
    const folderName = inputs[1].value;
    const folder = state.folders.getFolder(folderName);

    if (folder.addBookmark(url)) {
        state.folders.writeStorage();
        const curBookmarksEl = document.querySelector(`ul[data-id*="${folderName}"]`);

        renderBookmark(curBookmarksEl, url);
        curBookmarksEl.firstElementChild.classList.remove("d-none");
        html.sectionAdded().style.display = "flex";
        removeTitle(html.sectionAdded());
    } else {
        renderError(document.querySelector(".error-field"), "URL is repeating")
    }
}

// Event listeners
html.formAddFolder().addEventListener("submit", formAddFolderSubmitHandler)
window.addEventListener("DOMContentLoaded", () => {
    state.folders = new Folders();
    state.folders.readStorage();

    renderFolders(state.folders.folders);
    renderBookmarks(state.folders.folders);
    renderBookmarksArrow(state.folders.folders);
});

html.sectionFolders().addEventListener("click", sectionFoldersClickHandler);
html.formAddURL().addEventListener("submit", formAddURLSubmitHandler);
html.ctaCloseForms().addEventListener("click", evt => {
    evt.target.parentElement.parentElement.classList.add("d-none");
})
html.ctaMainAddBookmark().addEventListener("click", () => {
    html.sectionForms().classList.remove("d-none");
})
