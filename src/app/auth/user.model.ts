/**
 * Created by sarmasagigy on 2017. 07. 11..
 */
export class User {

  private _email: string; // Unique id
  private _password: string;
  private _username: string;
  // TODO imagePath for user

  constructor(email: string, password: string, username: string) {
    this._email = email;
    this._password = password;
    this._username = username;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
