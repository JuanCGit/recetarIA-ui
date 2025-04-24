export interface LoginRequestInterface {
  email: string;
  password: string;
}

export interface RegisterRequestInterface extends LoginRequestInterface {
  username: string;
}

export interface TokenInterface {
  token: string;
}

export interface UserInterface {
  id: number;
  username: string;
  email: string;
}
