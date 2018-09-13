export class LoginData {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(email: string, firstName: string, lastName: string, password: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
