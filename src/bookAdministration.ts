import { CardTemplateController } from "./controllers/render.controller.js";
import { BooksController } from "./controllers/controller.book.js";

const URL_BOOKS: string = "http://190.147.64.47:5155";

document.addEventListener("DOMContentLoaded", function () {
    const btnLogout = document.getElementById("btn-logout");
    const prevPage = document.getElementById("prev-page");
    const nextPage = document.getElementById("next-page");
    const token = localStorage.getItem("authToken");
    let currentPage: number = 1;
    const limit: number = 10;

    if (!btnLogout || !prevPage || !nextPage) {
        console.error("One or more required elements are missing from the DOM");
        return;
    }

    btnLogout.addEventListener("click", (e: Event) => {
        e.preventDefault();
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
    });

    if (!token) {
        alert("Authentication token is missing. Please log in.");
        window.location.href = "index.html";
    } else {
        const containerBooks = document.querySelector("#booksList") as HTMLDivElement;
        const form = document.querySelector("form") as HTMLFormElement;
        const title = document.getElementById("title") as HTMLInputElement;
        const author = document.getElementById("author") as HTMLInputElement;
        const description = document.getElementById("description") as HTMLInputElement;
        const summary = document.getElementById("summary") as HTMLInputElement;
        const publicationDate = document.getElementById("publication-date") as HTMLInputElement;
        let idCatche: undefined | string;

        const cardTemplate = new CardTemplateController(containerBooks);

        prevPage.addEventListener("click", async (e: Event) => {
            if (currentPage >= 1) {
                currentPage--
                await allBooks(limit, currentPage);
            }
        });

        nextPage.addEventListener("click", async (e: Event) => {
            if (currentPage >= 1) {
                currentPage++
                await allBooks(limit, currentPage);
            }
        });

        form.addEventListener("submit", async (e: Event) => {
            e.preventDefault();
            const crudBooks = new BooksController(URL_BOOKS);
    
            const title = (document.getElementById("title") as HTMLInputElement)?.value;
            const author = (document.getElementById("author") as HTMLInputElement)?.value;
            const description = (document.getElementById("description") as HTMLTextAreaElement)?.value;
            const summary = (document.getElementById("summary") as HTMLTextAreaElement)?.value;
            const publicationDate = (document.getElementById("publicationDate") as HTMLInputElement)?.value;
    
            if (!title || !author || !description || !summary || !publicationDate) {
                alert("Por favor, rellena todos los campos");
                return;
            }
    
            if (idCatche === undefined) {
                await crudBooks.create(title, author, description, summary, publicationDate, token as string);
            } else {
                await crudBooks.update(idCatche,title, author, description, summary, publicationDate, token as string);
                idCatche = undefined;
            }
            form.reset();
            await allBooks(limit, currentPage);
        });

        containerBooks.addEventListener("click", async (e: Event) => {
            if (e.target instanceof HTMLButtonElement) {
                const crudBooks = new BooksController(URL_BOOKS);

                if (e.target.classList.contains("btn-warning")) {
                    idCatche = e.target.dataset.id;

                    if (idCatche) {
                        const book = await crudBooks.getById(idCatche, token as string)
                        title.value = book.data.title;
                        author.value = book.data.author;
                        description.value = book.data.description;
                        summary.value = book.data.summary;
                        publicationDate.value = book.data.publicationDate
                    }
                } else if (e.target.classList.contains("btn-danger")) {
                    console.log("estoy en el delete")
                    let bookId = e.target.dataset.id;

                    if (bookId) {
                        const confirmDelete = confirm("Are you sure you want to delete?")
                        if (confirmDelete) {
                            await crudBooks.delete(bookId, token as string);
                            idCatche = undefined;
                            await allBooks(limit, currentPage);
                        }
                    }
                }
            }

        })


        async function allBooks(limit: number, currentPage: number) {
            const crudBooks = new BooksController(URL_BOOKS);
            try {
                const response = await crudBooks.allBooks(token as string, limit, currentPage);
                console.log(`Respuesta de allBooks ${response}`)
                const books = response.data;

                containerBooks.innerHTML = '';

                for (const book of books) {
                    cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }

            } catch (error) {
                console.error("Error fetching books:", error);
            }
        }
        allBooks(limit, currentPage);
    }
})