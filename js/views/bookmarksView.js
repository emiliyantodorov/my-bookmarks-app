const renderBookmark = (outputEl, url) => {
    let curURL = url;
    if (url.length > 30) {
        curURL = `${url.slice(0, 50)}...`;
    }

    const bookmark = `<li class="bookmarks__item"><img src="../../img/icon-close-1.png" alt="close-icon" class="bookmarks__remove-icon"><a href=${url} class="bookmarks__link" target="_blank">${curURL}</a></li>`;
    outputEl.insertAdjacentHTML("beforeend", bookmark);

    return outputEl;
}

const renderBookmarksArrow = folders => {
    folders.forEach(({name, bookmarks}) => {
        if (bookmarks.length > 0) {
            document.querySelector(`ul[data-id*="${name}"]`).firstElementChild.style.display = "block"
        }
    });
}

const renderBookmarks = (folders) => {
    folders.forEach(({name, bookmarks}) => {
        bookmarks.reduce((acc, curBookmarkURL) => {
            return renderBookmark(acc, curBookmarkURL);
        }, document.querySelector(`ul[data-id*="${name}"]`));
    })
}

export {
    renderBookmark,
    renderBookmarks,
    renderBookmarksArrow,
}