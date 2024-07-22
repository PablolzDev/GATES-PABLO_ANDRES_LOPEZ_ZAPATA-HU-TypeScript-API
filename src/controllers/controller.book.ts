import {
    BodyResponseDeleteBook,
    BodyResponseGetById,
    BodyResponseGetAllBooks,
    BodyRequestCreateBook,
    BodyResponseCreateBook,
    BodyResquestUpdateBook,
    BodyResponseUpdateBook
  } from "../models/book.model";
  
  export class BooksController {
    constructor(private domain: string) {}
  
    private async fetchWithAuth(endpoint: string, options: RequestInit, token: string): Promise<Response> {
      const headers = {
        "accept": "*/*",
        "Authorization": `Bearer ${token}`,
        ...options.headers
      };
      const response = await fetch(`${this.domain}${endpoint}`, { ...options, headers });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}: ${response.statusText}`);
      }
      return response;
    }
  
    async allBooks(token: string, limit: number, page: number): Promise<BodyResponseGetAllBooks> {
      const response = await this.fetchWithAuth(`/api/v1/books?limit=${limit}&page=${page}`, { method: "GET" }, token);
      return response.json();
    }
  
    async create(bookData: {
      title: HTMLInputElement,
      author: HTMLInputElement,
      description: HTMLInputElement,
      summary: HTMLInputElement,
      publicationDate: HTMLInputElement
    }, token: string): Promise<BodyResponseCreateBook> {
      const newBook: BodyRequestCreateBook = {
        title: bookData.title.value,
        author: bookData.author.value,
        description: bookData.description.value,
        summary: bookData.summary.value,
        publicationDate: bookData.publicationDate.value
      };
      const response = await this.fetchWithAuth("/api/v1/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook)
      }, token);
      return response.json();
    }
  
    async getById(id: string, token: string): Promise<BodyResponseGetById> {
      const response = await this.fetchWithAuth(`/api/v1/books/${id}`, { method: "GET" }, token);
      return response.json();
    }
  
    async update(id: string, bookData: {
      title: HTMLInputElement,
      author: HTMLInputElement,
      description: HTMLInputElement,
      summary: HTMLInputElement,
      publicationDate: HTMLInputElement
    }, token: string): Promise<BodyResponseUpdateBook> {
      const updateBook: BodyResquestUpdateBook = {
        title: bookData.title.value,
        author: bookData.author.value,
        description: bookData.description.value,
        summary: bookData.summary.value,
        publicationDate: bookData.publicationDate.value
      };
      const response = await this.fetchWithAuth(`/api/v1/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateBook)
      }, token);
      return response.json();
    }
  
    async delete(id: string, token: string): Promise<BodyResponseDeleteBook> {
      const response = await this.fetchWithAuth(`/api/v1/books/${id}`, { method: "DELETE" }, token);
      return response.json();
    }
  }