import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: string[];

  constructor(public auth: AuthService, private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
  }

  onSignOut() {
    this.auth.signOutUser();
  }
}
