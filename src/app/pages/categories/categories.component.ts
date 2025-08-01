import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { categories } from '../../data/categories';

@Component({
  selector: 'app-categories',
  imports: [
    CommonModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categories = categories;

}
