import { Injectable } from '@angular/core';
/**
 * Created by sarmasagigy on 2017. 07. 11..
 */
@Injectable()
export class CategoriesService {
  private categories: string[];
  categoryImagePath: string;

  constructor() {
    this.categories = [
      'Coffee bar',
      'Pub',
      'Restaurant',
      'Fast food',
      'Confectionery'
    ]
  }

  getCategories() {
    return this.categories.slice();
  }

  getCategoryImagePath(category: string) {
    switch (category) {
      case 'Coffee bar':
        this.categoryImagePath = 'assets/icons/rsz_coffee.png';
        break;
      case 'Pub':
        this.categoryImagePath = 'assets/icons/rsz_pub.png';
        break;
      case 'Restaurant':
        this.categoryImagePath = 'assets/icons/rsz_restaurant.png';
        break;
      case 'Fast food':
        this.categoryImagePath = 'assets/icons/rsz_fastfood.png';
        break;
      case 'Confectionery':
        this.categoryImagePath = 'assets/icons/rsz_confectionery.png';
        break;
      default:
        this.categoryImagePath = 'assets/icons/rsz_default.png';
        break;
    }
    return this.categoryImagePath;
  }
}
