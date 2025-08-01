import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogOut, lucidePackage, lucideShoppingCart, lucideUser, lucideMoon, lucideSun, lucideSunMoon } from '@ng-icons/lucide';
import { HlmMenu, HlmMenuItem, HlmMenuSeparator, HlmMenuItemRadio, HlmMenuItemCheck } from '@spartan-ng/helm/menu';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    HlmButton,
    NgIcon,
    HlmMenu,
    HlmMenuItem,
    HlmMenuSeparator,
    BrnMenuTrigger,
    HlmMenuItemCheck,
    HlmMenuItemRadio
  ],
  providers: [provideIcons({ 
    lucidePackage, 
    lucideShoppingCart,
    lucideUser,
    lucideLogOut,
    lucideMoon,
    lucideSun,
    lucideSunMoon
   })],
  template: `
    <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <a routerLink="/" class="flex items-center space-x-2">
            <ng-icon name="lucidePackage" class="h-6 w-6" size="24"/>
            <span class="text-xl font-bold">Shoppit</span>
          </a>

          <div class="hidden md:flex items-center space-x-6">
            <a routerLink="/" class="text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a routerLink="/products" class="text-sm font-medium hover:text-primary transition-colors">
              Products
            </a>
          </div>

          <div class="flex items-center space-x-4">
            <a routerLink="/cart" class="relative cursor-pointer">
              <button hlmBtn variant="outline" size="sm">
                <ng-icon name="lucideShoppingCart" class="h-4 w-4" />
                <span *ngIf="cartService.totalItems() > 0" 
                      class="px-2.5 py-0.5 absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-destructive text-destructive-foreground rounded-md text-white tabular-nums" hlmBadge variant="destructive">
                  {{ cartService.totalItems() }}
                </span>
              </button>
            </a>

            <div *ngIf="authService.user(); else loginButtons" class="relative">
              <button hlmBtn variant="outline" size="sm" [brnMenuTriggerFor]="userMenu">
                <ng-icon name="lucideUser" class="h-4 w-4 mr-2" />
                {{ authService.user()?.name }}
              </button>
              
              <ng-template #userMenu>
                <hlm-menu class="w-56">
                  <hlm-menu-item (click)="router.navigate(['/profile'])" hlmMenuItem>
                    <ng-icon name="lucideUser" class="h-4 w-4 mr-2" />
                    Profile
                  </hlm-menu-item>
                  <hlm-menu-item (click)="router.navigate(['/orders'])" hlmMenuItem>
                    <ng-icon name="lucidePackage" class="h-4 w-4 mr-2" />
                    Orders
                  </hlm-menu-item>
                  <hlm-menu-separator />
                  <hlm-menu-item (click)="handleLogout()" hlmMenuItem>
                    <ng-icon name="lucideLogOut" class="h-4 w-4 mr-2" />
                    Logout
                  </hlm-menu-item>
                </hlm-menu>
              </ng-template>
            </div>

            <ng-template #loginButtons>
              <div class="flex items-center space-x-2">
                <a routerLink="/login">
                  <button hlmBtn variant="outline" size="sm">Login</button>
                </a>
                <a routerLink="/signup">
                  <button hlmBtn size="sm">Sign Up</button>
                </a>
              </div>
            </ng-template>

            <div class="flex w-full items-center justify-center">
              <button hlmBtn variant="ghost" align="end" [brnMenuTriggerFor]="theme_menu">
                <ng-container>
                  <ng-icon *ngIf="selectedTheme === 'light'" name="lucideSun" size="16"></ng-icon>
                  <ng-icon *ngIf="selectedTheme === 'dark'" name="lucideMoon" size="16"></ng-icon>
                  <ng-icon *ngIf="selectedTheme === 'system'" 
                    [name]="systemPrefersDark ? 'lucideMoon' : 'lucideSun'" size="16">
                  </ng-icon>
                </ng-container>
              </button>
              <ng-template #theme_menu>
              <hlm-menu class="w-42">
                <button hlmMenuItemRadio class="capitalize" 
                  [checked]="selectedTheme === 'light'" 
                  (triggered)="selectTheme('light')">
                  <span>Light</span>
                  <hlm-menu-item-check />
                </button>
                <button hlmMenuItemRadio class="capitalize"
                  [checked]="selectedTheme === 'dark'" 
                  (triggered)="selectTheme('dark')">
                  <span>Dark</span>
                  <hlm-menu-item-check />
                </button>
                <button hlmMenuItemRadio class="capitalize"
                  [checked]="selectedTheme === 'system'" 
                  (triggered)="selectTheme('system')">
                  <span>System</span>
                  <hlm-menu-item-check />
                </button>
              </hlm-menu>
            </ng-template>
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {

  selectedTheme: 'light' | 'dark' | 'system' = 'system';
  systemPrefersDark: boolean = false;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public router: Router
  ) {}

  ngOnInit() {
    this.checkSystemThemePreference();
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  selectTheme(theme: 'light' | 'dark' | 'system') {
    this.selectedTheme = theme;
    switch (theme) {
      case 'light':
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;

      case 'dark':
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;

      case 'system':
        localStorage.removeItem('theme');
        // Optional: Reflect system preference
        this.checkSystemThemePreference();
        break;
    }
  }

  private checkSystemThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
          this.systemPrefersDark = true;
        } else {
          document.documentElement.classList.remove('dark');
          this.systemPrefersDark = false;
        }
  }
}