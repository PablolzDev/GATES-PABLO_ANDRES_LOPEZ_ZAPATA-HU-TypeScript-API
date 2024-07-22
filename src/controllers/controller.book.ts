import {BodyResponseDeleteBook, BodyResponseGetById, BodyResponseGetAllBooks, BodyRequestCreateBook, BodyResponseCreateBook, BodyResquestUpdateBook, BodyResponseUpdateBook} from "../models/book.model.js";

export class BooksController {
    public domain: string;

    constructor(domain: string){
        this.domain = domain;
    }

    async allBooks(token: string, limit: number, page:number): Promise<BodyResponseGetAllBooks>{
       const headers: Record<string, string> = {
        "accept": "*/*",
        "Authorization": `Bearer ${token}`,
       };

       const reqOptions: RequestInit = {
        method: "GET",
        headers: headers
       }

       const response: Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, reqOptions);
       console.log(response);
       if(!response.ok){
        throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText}`);
       }
       const responseBodyGetAllBooks: BodyResponseGetAllBooks = await response.json();
       return responseBodyGetAllBooks;
    }
    async create(title: string, author: string, description: string, summary: string, publicationDate: string, token: string): Promise<BodyResponseCreateBook> {
      const newBook: BodyRequestCreateBook = {
          title,
          author,
          description,
          summary,
          publicationDate
      };
  
      const headers: Record<string, string> = {
          "accept": "*/*",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      };
  
      const reqOptions: RequestInit = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(newBook)
      };
  
      const response: Response = await fetch(`${this.domain}/api/v1/books`, reqOptions);
      if (!response.ok) {
          throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText}`);
      }
      const responseBodyCreateBook: BodyResponseCreateBook = await response.json();
      return responseBodyCreateBook;
  }
    async getById(id: string, token: string): Promise<BodyResponseGetById>{
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
        };
        const reqOptions: RequestInit = {
        method: "GET",
        headers: headers
        };
        const response: Response = await fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
        if(!response.ok){
            throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText}`);
        }
        const responseBodyGetById: BodyResponseGetById = await response.json();
        return responseBodyGetById;
    };

    async update(idCatche:string,  title: string, author: string, description: string, summary: string, publicationDate: string, token: string): Promise<BodyResponseCreateBook> {
      const updateBook: BodyRequestCreateBook = {
          title,
          author,
          description,
          summary,
          publicationDate
      };

        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };

        const reqOptions: RequestInit ={
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(updateBook)
        };

        const response: Response = await fetch(`${this.domain}/api/v1/books/${idCatche}`, reqOptions);
        if(!response.ok){
            throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText}`);
        }
        const responseBodyUpdateBook: BodyResponseUpdateBook = await response.json();
        return responseBodyUpdateBook;
    };

    async delete(id: string, token: string):Promise<BodyResponseDeleteBook>{
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
        };

        const reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers
        };

        const response: Response = await fetch(`${this.domain}/api/v1/books/${id}`, reqOptions);
        if(!response.ok){
            throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText}`);
        }
        const responseBodyDeleteBook: BodyResponseDeleteBook = await response.json();
        return responseBodyDeleteBook;
    }
}