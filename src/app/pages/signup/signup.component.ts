import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideUserPlus } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgIcon,
    HlmButton,
    HlmCardImports,
    HlmInput,
    HlmLabel
  ],
  providers: [provideIcons({ 
    lucideUserPlus
   })],
  template: `
    <div class="max-w-md mx-auto">
      <hlm-card hlmCard>
        <hlm-card-header class="text-center" hlmCardHeader>
          <ng-icon name="lucideUserPlus" class="h-12 w-12 mx-auto mb-4" size="48"/>
          <hlm-card-title class="text-2xl" hlmCardTitle>Create Account</hlm-card-title>
          <p class="text-muted-foreground">Join Shoppit today</p>
        </hlm-card-header>
        <hlm-card-content hlmCardContent>
          <form (ngSubmit)="handleSubmit()" class="space-y-4">
            <div class="grid gap-2">
              <label hlmLabel for="name">Full Name</label>
              <input
                hlmInput
                id="name"
                [(ngModel)]="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div class="grid gap-2">
              <label hlmLabel for="email">Email</label>
              <input
                hlmInput
                id="email"
                type="email"
                [(ngModel)]="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div class="grid gap-2">
              <label hlmLabel for="password">Password</label>
              <input
                hlmInput
                id="password"
                type="password"
                [(ngModel)]="password"
                name="password"
                placeholder="Create a password"
                required
              />
            </div>
            <div class="grid gap-2">
              <label hlmLabel for="confirmPassword">Confirm Password</label>
              <input
                hlmInput
                id="confirmPassword"
                type="password"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              hlmBtn
              type="submit"
              class="w-full"
              [disabled]="loading()"
            >
              {{ loading() ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>
          <div class="mt-6 text-center">
            <p class="text-sm text-muted-foreground">
              Already have an account?
              <a routerLink="/login" class="text-primary hover:underline ml-1">
                Sign in
              </a>
            </p>
          </div>
        </hlm-card-content>
      </hlm-card>
    </div>
  `
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  async handleSubmit() {
    if (this.password !== this.confirmPassword) {
      this.toastService.error('Passwords do not match');
      return;
    }

    this.loading.set(true);

    try {
      const success = await this.authService.signup(this.email, this.password, this.name);
      if (success) {
        this.toastService.success('Account created successfully!');
        this.router.navigate(['/']);
      } else {
        this.toastService.error('Registration failed');
      }
    } catch (error) {
      this.toastService.error('Registration failed');
    } finally {
      this.loading.set(false);
    }
  }
}