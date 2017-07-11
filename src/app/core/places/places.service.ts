/**
 * Created by sarmasagigy on 2017. 07. 11..
 */
import { Place } from '../place.model';
export class PlacesService {
  private places: Place[] = [
    new Place(0,
      '0,75 Bistro',
      'test@test.com',
      47.500438,
      19.052505,
      1051,
      'Szent István tér',
      6,
      'Ádám volt munkahelye',
      'http://www.boraszportal.hu/upload/kepek/images/2015/07/borbar/075_4.jpg',
      '(70) 370 7474',
      'http://075bistro.hu/',
      8,
      24,
      ['Pub']),
    new Place(1,
      'Belvárosi Disznótoros',
      'faklyasgyuri@gmail.com',
      47.498058,
      19.056473,
      1075,
      'Kiráy utca',
      1,
      'Györk szeret ide jönni Eszterrel',
      'https://media-cdn.tripadvisor.com/media/photo-s/09/36/9f/6d/belvarosi-disznotoros.jpg',
      '(1) 791 4828',
      'http://belvarosidisznotoros.hu/',
      10,
      22,
      ['Restaurant']),
    new Place(2,
      'Pizza Manufaktura',
      'faklyasgyuri@gmail.com',
      47.487293,
      19.061201,
      1092,
      'Lónyay utca',
      9,
      'Itt dolgozik Áron',
      'http://etterem.hu/img/max960/p11776n/1418824498-6098.jpg',
      '(1) 210 1267',
      'https://www.facebook.com/pizzamanufaktura',
      11,
      21,
      ['Restaurant'])
  ];

  getPlaces() {
    return this.places.slice();
  }

  getPlaceById(id: number) {
    return this.places[id];
  }
}

