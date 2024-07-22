import { LoginRequest, LoginResponse } from "../models/auth.model";

export class AuthController {
  public baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async authenticate(email: HTMLInputElement, password: HTMLInputElement): Promise<LoginResponse> {
    const loginDetails: LoginRequest = {
      email: email.value,
      password: password.value
    };

    const headers: Record<string, string> = {
      'accept': '*/*',
      'Content-Type': 'application/json'
  };

  const reqOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(loginDetails)
  };

  try {
      const response: Response = await fetch(`${this.baseUrl}/api/v1/auth/login`, reqOptions);

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error message: ${errorData.message}`);
        throw new Error(`Error: ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }
}