import { LoginRequest, LoginResponse } from "../models/auth.model";

export class AuthController {
  public baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async authenticate(email: string, password: string): Promise<LoginResponse> {
    const loginDetails: LoginRequest = {
      email: email,
      password: password
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDetails)
    };

    try {
      const response: Response = await fetch(`${this.baseUrl}/api/v1/auth/login`, requestOptions);

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