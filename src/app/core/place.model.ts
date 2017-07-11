/**
 * Created by sarmasagigy on 2017. 07. 11..
 */
export class Place {
  private _id: number;
  private _name: string;
  private _userEmail: string;
  // position
  private _latitude: number;
  private _longitude: number;
  // address
  private _postcode: number;
  private _street: string;
  private _houseNumber: number;
  // details
  private _description: string;
  private _imagePath: string;
  private _phoneNumber: string;
  private _webUrl: string;
  private _openTime: number;
  private _closeTime: number;
  private _categories: string[];
  // TODO Rating

  constructor(id: number,
              name: string,
              userEmail: string,
              latitude: number,
              longitude: number,
              postcode: number,
              street: string,
              houseNumber: number,
              description: string,
              imagePath: string,
              phoneNumber: string,
              webUrl: string,
              openTime: number,
              closeTime: number,
              categories: string[]) {
    this._id = id;
    this._name = name;
    this._userEmail = userEmail;
    this._latitude = latitude;
    this._longitude = longitude;
    this._postcode = postcode;
    this._street = street;
    this._houseNumber = houseNumber;
    this._description = description;
    this._imagePath = imagePath;
    this._phoneNumber = phoneNumber;
    this._webUrl = webUrl;
    this._openTime = openTime;
    this._closeTime = closeTime;
    this._categories = categories;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get userEmail(): string {
    return this._userEmail;
  }

  set userEmail(value: string) {
    this._userEmail = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get postcode(): number {
    return this._postcode;
  }

  set postcode(value: number) {
    this._postcode = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get houseNumber(): number {
    return this._houseNumber;
  }

  set houseNumber(value: number) {
    this._houseNumber = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get webUrl(): string {
    return this._webUrl;
  }

  set webUrl(value: string) {
    this._webUrl = value;
  }

  get openTime(): number {
    return this._openTime;
  }

  set openTime(value: number) {
    this._openTime = value;
  }

  get closeTime(): number {
    return this._closeTime;
  }

  set closeTime(value: number) {
    this._closeTime = value;
  }

  get categories(): string[] {
    return this._categories;
  }

  set categories(value: string[]) {
    this._categories = value;
  }
}
