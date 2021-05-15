import {html, removeElement} from "../base.js";

const renderFolder = name => {
    const folderEl = `<div class="folder">
            <img src="./img/icon-close-1.png" alt="close icon" class="folder__remove-icon" data-name="${name}">
            <div class="folder__title">${name}</div>
            <div class="folder__img-and-bookmarks">
                <img src="./img/folder.png" alt="folder.png" class="folder__img">
                <ul class="bookmarks" data-id="${name}"><div class="arrow d-none"></div></ul>
            </div>
        </div>`

    html.sectionFolders().insertAdjacentHTML("beforeend", folderEl);
}

const renderFolderOption = folderName => {
    html.selectField().insertAdjacentHTML("beforeend", `<option value="${folderName}">${folderName}</option>`);
}

const renderFolders = folders => {
    folders.forEach(({name}) => {
        renderFolder(name);
        renderFolderOption(name)
    })
}

const removeFolderFromUI = removeElement.bind(null);

export {
    renderFolder,
    renderFolderOption,
    renderFolders,
    removeFolderFromUI,
}