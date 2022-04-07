export interface PasswordOptions {
  upperCase?: boolean;
  numbers?: boolean;
  minLength?: number;
}

export interface PasswordValidationByRule {
  isValidUpperCase: boolean;
  isValidNumbers: boolean;
  isValidMinLength: boolean;
}

export interface UsernameValidationByRule {
  isValidMinLength: boolean;
  isValidUsername: boolean;
}

export interface LoginSystemLoginPostBody {
  email: string;
  password: string;
}

export interface LoginSystemRegisterPostBody {
  name: string;
  email: string;
  password: string;
}
