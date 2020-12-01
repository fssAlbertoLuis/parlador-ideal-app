export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUserRegistrationErrors {
  name?: string[];
  email?: string[];
  password?: string[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
  }
}
