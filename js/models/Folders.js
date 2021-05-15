import Folder from "./Folder.js";

class Folders {
    constructor(folders = []) {
        this.folders = folders;
    }

    add(folder) {
        if (!this.getFolder(folder.name)) {
            this.folders.push(folder);

            return this.writeStorage();
        }

        return null;
    }

    remove(name) {
        this.folders = this.folders.filter(curFolder => curFolder.name !== name);
        this.writeStorage();
    }

    getFolder(name) {
        return this.folders.find(curFolder => curFolder.name === name);
    }

    readStorage() {
        let storageFolders = JSON.parse(localStorage.getItem("folders"));
        if (storageFolders) {
            storageFolders = storageFolders.map(({name, bookmarks}) => new Folder(name, bookmarks));

            this.folders = storageFolders;
        }

        return storageFolders;
    }

    writeStorage() {
        localStorage.setItem("folders", JSON.stringify(this.folders));

        return this;
    }
}

export default Folders;