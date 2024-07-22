
import { LoginResponse } from "./models/auth.model";
import { AuthController } from "./controllers/controllers.user.js";

const userUrl: string = "http://190.147.64.47:5155";
const form = document.querySelector(".sign-in-container form") as HTMLFormElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const pssInput = document.querySelector("#pss") as HTMLInputElement;

form.addEventListener("submit", async (e: Event) =>{
    e.preventDefault();
    const crudUsers = new AuthController(userUrl);
    const respuesta = await crudUsers.authenticate(emailInput,pssInput);

    const token: string | null = respuesta.data.token;

    if(token){
        console.log(`login exitoso ${token}`)
        localStorage.setItem('authToken', token);
        window.location.href = "bookManagment.html";
    } else {
        console.log("login fallo");
    }
    form.reset();
});