/**
 * Created by sarmasagigy on 2017. 07. 11..
 */
export class User {

  email: string;
  username: string;
  places: {};
  // TODO imagePath for user

  constructor(email: string, username: string) {
    this.email = email;
    this.username = username;
    this.places = {};
  }
}
