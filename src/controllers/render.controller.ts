export class BookCardManager {
    private bookshelf: HTMLElement;

    constructor(bookshelf: HTMLElement) {
        this.bookshelf = bookshelf;
    }

    displayBook(id: string, title: string, author: string, description: string, summary: string, publicationDate: string): void {
        const bookCard = document.createElement("article");
        bookCard.className = "book-item col-md-4";

        const titleElem = this.createElem("h3", title, ["book-name"]);
        const authorElem = this.createElem("h5", author, ["book-writer"]);

        const detailsSection = document.createElement("section");
        detailsSection.className = "book-details bg-white text-dark";

        const descriptionElem = this.createElem("h6", description, ["book-description"]);
        const summaryElem = this.createElem("p", summary, ["book-summary"]);
        const dateElem = this.createElem("small", publicationDate, ["book-release"]);

        detailsSection.append(descriptionElem, summaryElem, dateElem);

        const actionPanel = document.createElement("div");
        actionPanel.className = "book-actions";

        const modifyBtn = this.createButton("Modify", ["btn-warning"], id);
        const removeBtn = this.createButton("Remove", ["btn-danger"], id);

        actionPanel.append(modifyBtn, removeBtn);
        detailsSection.appendChild(actionPanel);

        bookCard.append(titleElem, authorElem, detailsSection);
        this.bookshelf.appendChild(bookCard);
    }

    private createElem(tag: string, content: string, classes: string[]): HTMLElement {
        const elem = document.createElement(tag);
        elem.textContent = content;
        elem.classList.add(...classes);
        return elem;
    }

    private createButton(text: string, classes: string[], dataId: string): HTMLButtonElement {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.classList.add("btn", ...classes);
        btn.setAttribute("type", "button");
        btn.dataset.id = dataId;
        return btn;
    }
}