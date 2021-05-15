class Folder {
    constructor(name, bookmarks = []) {
        this.name = name;
        this.bookmarks = bookmarks;
    }

    addBookmark(URL) {
        if (!this.getBookmark(URL)) {
            this.bookmarks.push(URL);

            return URL;
        }

        return null;
    }

    removeBookmark(url) {
        this.bookmarks = this.bookmarks.filter(curURL => curURL !== url);
        return url;
    }

    getBookmark(URL) {
        return this.bookmarks.find(curBookmark => curBookmark === URL);
    }
}

export default Folder;