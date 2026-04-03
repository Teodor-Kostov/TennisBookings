export type User = {
  _id: string;
  username: string;
  email: string;
  tel?: string;
  password?: string;
  created_at?: string;
  updatedAt?: string;
};

export type UserForAuth = {
  id: string,
  firstName: string,
  secondName: string,
  tel?: string,
  email: string,
  password: string
}


// a value that can be also null or undefined
export type Maybe<T> = T | null | undefined;


  export type LoginRequest = {
    email: string;
    password: string;
  }

  export type RegisterRequest = {
    tel?: string;
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
  }

  export type EditProfileRequest = {
    tel?: string | null;
    username: string;
    email: string;
  }
  export type ErrorResponse = {
    message: string;
  }

