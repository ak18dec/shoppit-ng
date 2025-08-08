import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  lucideArrowRight, 
  lucideHeadphones, 
  lucideLogOut, 
  lucidePackage, 
  lucideShield, 
  lucideShoppingCart, 
  lucideStar, 
  lucideTruck, 
  lucideUser 
} from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { products } from '../../data/products';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HlmButton,
    ProductCardComponent,
    HlmCardImports,
    NgIcon
  ],
  providers: [provideIcons({ 
    lucidePackage, 
    lucideShoppingCart,
    lucideUser,
    lucideLogOut,
    lucideArrowRight,
    lucideHeadphones,
    lucideShield,
    lucideTruck,
    lucideStar
   })],
  template: `
    <div class="space-y-16 text-primary">
      <!-- Hero Section -->
      <section class="text-center space-y-6 py-12">
        <h1 class="text-4xl md:text-6xl font-bold">
          Welcome to <span class="text-primary">Shoppit</span>
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices. Quality guaranteed, fast shipping, and exceptional customer service.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/products">
            <button hlmBtn size="lg" class="gap-2">
              Shop Now
              <ng-icon name="lucideArrowRight" class="h-4 w-4" />
            </button>
          </a>
          <a routerLink="/categories">
            <button hlmBtn variant="outline" size="lg">
              Browse Categories
            </button>
          </a>
        </div>
      </section>

      <!-- Features Section -->
      <section class="grid md:grid-cols-3 gap-8">
        <hlm-card hlmCard>
          <hlm-card-content class="pt-6 text-center" hlmCardContent>
            <ng-icon name="lucideTruck" class="h-12 w-12 mx-auto mb-4 text-primary" size="48"/>
            <h3 class="text-xl font-semibold mb-2">Free Shipping</h3>
            <p class="text-muted-foreground">Free shipping on orders over $50. Fast and reliable delivery.</p>
          </hlm-card-content>
        </hlm-card>
        <hlm-card hlmCard>
          <hlm-card-content class="pt-6 text-center" hlmCardContent>
            <ng-icon name="lucideShield" class="h-12 w-12 mx-auto mb-4 text-primary" size="48"/>
            <h3 class="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p class="text-muted-foreground">30-day money-back guarantee on all products.</p>
          </hlm-card-content>
        </hlm-card>
        <hlm-card hlmCard>
          <hlm-card-content class="pt-6 text-center" hlmCardContent>
            <ng-icon name="lucideHeadphones" class="h-12 w-12 mx-auto mb-4 text-primary" size="48"/>
            <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
            <p class="text-muted-foreground">Get help whenever you need it with our customer support.</p>
          </hlm-card-content>
        </hlm-card>
      </section>

      <!-- Featured Products -->
      <section>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold">Featured Products</h2>
          <a routerLink="/products">
            <button hlmBtn variant="outline" class="gap-2">
              View All
              <ng-icon name="lucideArrowRight" class="h-4 w-4" />
            </button>
          </a>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <app-product-card 
            *ngFor="let product of featuredProducts" 
            [product]="product">
          </app-product-card>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="bg-muted/50 rounded-lg p-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-primary">10K+</div>
            <div class="text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary">500+</div>
            <div class="text-muted-foreground">Products</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary">4.8</div>
            <div class="text-muted-foreground flex items-center justify-center gap-1">
              <ng-icon name="lucideStar" class="h-4 w-4 fill-yellow-400 text-yellow-400" size="16"/>
              Rating
            </div>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary">99%</div>
            <div class="text-muted-foreground">Satisfaction</div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  featuredProducts = products.slice(0, 4);
}