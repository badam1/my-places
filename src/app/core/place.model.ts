/**
 * Created by sarmasagigy on 2017. 07. 11..
 */
export class Place {
  id: number;
  name: string;
  userEmail: string;
  // position
  latitude: number;
  longitude: number;
  // address
  address: string;
  // details
  description: string;
  imagePath: string;
  phoneNumber: string;
  webUrl: string;
  openTime: number;
  closeTime: number;
  categories: string[];
  // TODO Rating

  constructor(id: number,
              name: string,
              userEmail: string,
              latitude: number,
              longitude: number,
              address: string,
              description: string,
              imagePath: string,
              phoneNumber: string,
              webUrl: string,
              openTime: number,
              closeTime: number,
              categories: string[]) {
    this.id = id;
    this.name = name;
    this.userEmail = userEmail;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
    this.description = description;
    this.imagePath = imagePath;
    this.phoneNumber = phoneNumber;
    this.webUrl = webUrl;
    this.openTime = openTime;
    this.closeTime = closeTime;
    this.categories = categories;
  }

}
