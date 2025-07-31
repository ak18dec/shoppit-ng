import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
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
    lucideLogIn
   })],
  template: `
    <div class="max-w-md mx-auto">
      <hlm-card hlmCard>
        <hlm-card-header class="text-center" hlmCardHeader>
          <ng-icon name="lucideLogIn" class="h-12 w-12 mx-auto mb-4" size="48"/>
          <hlm-card-title class="text-2xl" hlmCardTitle>Welcome Back</hlm-card-title>
          <p class="text-muted-foreground">Sign in to your account</p>
        </hlm-card-header>
        <hlm-card-content hlmCardContent>
          <form (ngSubmit)="handleSubmit()" class="space-y-4">
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
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              hlmBtn
              type="submit"
              class="w-full"
              [disabled]="loading()"
            >
              {{ loading() ? 'Signing In...' : 'Sign In' }}
            </button>
          </form>
          <div class="mt-6 text-center">
            <p class="text-sm text-muted-foreground">
              Don't have an account?
              <a routerLink="/signup" class="text-primary hover:underline ml-1">
                Sign up
              </a>
            </p>
          </div>
          <div class="mt-4 p-4 bg-muted/50 rounded-lg">
            <p class="text-sm text-muted-foreground text-center">
              <strong>Demo:</strong> Use any email and password to log in
            </p>
          </div>
        </hlm-card-content>
      </hlm-card>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  async handleSubmit() {
    this.loading.set(true);

    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.toastService.success('Welcome back!');
        this.router.navigate(['/']);
      } else {
        this.toastService.error('Invalid credentials');
      }
    } catch (error) {
      this.toastService.error('Login failed');
    } finally {
      this.loading.set(false);
    }
  }
}