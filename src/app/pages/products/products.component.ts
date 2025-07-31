import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideListFilter, lucideSearch } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { products, categories } from '../../data/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HlmButton,
    HlmInput,
    BrnSelectImports, 
    HlmSelectImports,
    ProductCardComponent
  ],
  providers: [provideIcons({ 
    lucideSearch,
    lucideListFilter
   })],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h1 class="text-3xl font-bold">Products</h1>
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div class="relative">
            <ng-icon name="lucideSearch" class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" color="var(--muted-foreground)" />
            <input
              hlmInput
              placeholder="Search products..."
              [(ngModel)]="searchTerm"
              (ngModelChange)="updateSearchTerm($event)"
              class="pl-10 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 items-center">
        <div class="flex items-center gap-2">
          <ng-icon name="lucideListFilter" class="h-4 w-4" />
          <span class="text-sm font-medium">Filters:</span>
        </div>
        
        <brn-select [(ngModel)]="selectedCategory" (ngModelChange)="updateCategory($event)">
          <hlm-select-trigger class="w-48">
            <hlm-select-value placeholder="Category" />
          </hlm-select-trigger>
          <hlm-select-content>
            <hlm-option *ngFor="let category of categories" [value]="category">
              {{ category }}
            </hlm-option>
          </hlm-select-content>
        </brn-select>

        <brn-select [(ngModel)]="sortBy" (ngModelChange)="updateSortBy($event)">
          <hlm-select-trigger class="w-48">
            <hlm-select-value placeholder="Sort by" />
          </hlm-select-trigger>
          <hlm-select-content>
            <hlm-option value="name">Name (A-Z)</hlm-option>
            <hlm-option value="price-low">Price (Low to High)</hlm-option>
            <hlm-option value="price-high">Price (High to Low)</hlm-option>
            <hlm-option value="rating">Rating</hlm-option>
          </hlm-select-content>
        </brn-select>
      </div>

      <div class="text-sm text-muted-foreground">
        Showing {{ filteredProducts().length }} products
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <app-product-card 
          *ngFor="let product of filteredProducts()" 
          [product]="product">
        </app-product-card>
      </div>

      <div *ngIf="filteredProducts().length === 0" class="text-center py-12">
        <p class="text-muted-foreground mb-4">No products found matching your criteria.</p>
        <button hlmBtn (click)="clearFilters()">
          Clear Filters
        </button>
      </div>
    </div>
  `
})
export class ProductsComponent {
  searchTerm = signal('');
  selectedCategory = signal('All');
  sortBy = signal('name');
  
  categories = categories;

  filteredProducts = computed(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm().toLowerCase());
      const matchesCategory = this.selectedCategory() === 'All' || product.category === this.selectedCategory();
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (this.sortBy()) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  });

  updateSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  updateCategory(category: string) {
    this.selectedCategory.set(category);
  }

  updateSortBy(sort: string) {
    this.sortBy.set(sort);
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('All');
    this.sortBy.set('name');
  }
}