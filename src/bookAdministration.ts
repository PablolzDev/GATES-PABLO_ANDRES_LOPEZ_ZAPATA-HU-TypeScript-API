import { BookCardManager } from "./controllers/render.controller.js";
import { BooksController } from "./controllers/controller.book.js";

const userUrl: string = "http://190.147.64.47:5155";

const bookContainer = document.querySelector(".form-container") as HTMLDivElement
const form = document.querySelector("#bookForm") as HTMLFormElement
const title = document.querySelector("#title") as HTMLInputElement
const author = document.querySelector("#author") as HTMLInputElement
const description = document.querySelector("#description") as HTMLInputElement
const summary = document.querySelector("#summary") as HTMLInputElement
const publicationDate = document.querySelector("#publicationDate") as HTMLInputElement
let editBookId: undefined | string;

form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    const booksController = new BooksController(userUrl);
    const authToken = localStorage.getItem("userToken") as string;

    const bookData = {
        title,
        author,
        description,
        summary,
        publicationDate
    };

    if (!editBookId) {
        await booksController.create(title, author, description, summary, publicationDate, authToken);
        form.reset();
        await refreshBookList()
    } else {
        await booksController.update(editBookId, bookData, authToken);
        editBookId = undefined;
    }

    
});


bookContainer.addEventListener("click", async (event: Event) => {
    if (event.target instanceof HTMLButtonElement) {
        const booksController = new BooksController(userUrl);
        const authToken = localStorage.getItem("userToken") as string;

        if (event.target.classList.contains("btn-warning")) {
            editBookId = event.target.dataset.id;
            if (editBookId) {
                const bookData = await booksController.getById(editBookId, authToken);
                title.value = bookData.data.title;
                author.value = bookData.data.author;
                description.value = bookData.data.description;
                summary.value = bookData.data.summary;
                publicationDate.value = bookData.data.publicationDate;
            }
        } else if (event.target.classList.contains("btn-danger")) {
            const bookIdToDelete = event.target.dataset.id;
            if (bookIdToDelete) {
                const confirmDeletion = confirm("Are you sure you want to delete this book?");
                if (confirmDeletion) {
                    await booksController.delete(bookIdToDelete, authToken);
                    editBookId = undefined;
                    await refreshBookList()
                }
            }
        }
    }
});

async function refreshBookList() { 
    const booksController = new BooksController(userUrl);
    const authToken = localStorage.getItem("userToken") as string;

    try {
        
        const response = await booksController.allBooks(authToken);
        console.log(`Book list refresh response: ${JSON.stringify(response)}`);
        const books = response.data;

        const displayManager = new BookCardManager(bookContainer);
        bookContainer.innerHTML = '';

        books.forEach(book => {
            displayManager.displayBook(
                book.id,
                book.title,
                book.author,
                book.description,
                book.summary,
                book.publicationDate
            );
        });
    } catch (error) {
        console.error("Error while refreshing book list:", error);
    }
}

refreshBookList()