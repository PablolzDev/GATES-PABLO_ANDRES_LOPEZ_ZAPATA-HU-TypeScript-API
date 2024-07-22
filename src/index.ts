
import { LoginResponse } from "./models/auth.model";
import { AuthController } from "./controllers/controllers.user.js";

const userUrl: string = "http://190.147.64.47:5155";
const form = document.querySelector(".sign-in-container form") as HTMLFormElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const pssInput = document.querySelector("#pss") as HTMLInputElement;

form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const Users = new AuthController(userUrl);
    try {
        const response: LoginResponse = await Users.authenticate(emailInput.value, pssInput.value);
        
        if (response.data && response.data.token) {
            console.log(`Successful ${response.data.token}`);
            localStorage.setItem('authToken', response.data.token);
            window.location.href = "bookManagment.html";
        } else {
            console.log("Token not found in response");
            console.log("Response message:", response.message);
            console.log("Response data:", response.data);
        }
    } catch (error) {
        console.error("Authentication failed:", error);
    }
});