import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSave, lucideUser } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HlmButton,
    HlmCardImports,
    HlmInput,
    HlmLabel
  ],
  providers: [provideIcons({ 
    lucideUser,
    lucideSave
   })],
  template: `
    <div class="max-w-md mx-auto space-y-6">
      <h1 class="text-3xl font-bold">Profile Settings</h1>

      <hlm-card hlmCard>
        <hlm-card-header hlmCardHeader>
          <hlm-card-title class="flex items-center gap-2" hlmCardTitle>
            <ng-icon name="lucideUser" class="h-5 w-5" size="24"/>
            Personal Information
          </hlm-card-title>
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
              <label hlmLabel for="email">Email Address</label>
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
            <button
              hlmBtn
              type="submit"
              [disabled]="loading()"
              class="gap-2"
            >
              <ng-icon name="lucideSave" class="h-4 w-4" size="24"/>
              {{ loading() ? 'Saving...' : 'Save Changes' }}
            </button>
          </form>
        </hlm-card-content>
      </hlm-card>

      <hlm-card hlmCard>
        <hlm-card-header hlmCardHeader>
          <hlm-card-title hlmCardTitle>Account Statistics</hlm-card-title>
        </hlm-card-header>
        <hlm-card-content hlmCardContent>
          <div class="grid grid-cols-2 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-primary">
                {{ getOrderCount() }}
              </div>
              <div class="text-muted-foreground">Total Orders</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-primary">
                \${{ getTotalSpent().toFixed(2) }}
              </div>
              <div class="text-muted-foreground">Total Spent</div>
            </div>
          </div>
        </hlm-card-content>
      </hlm-card>
    </div>
  `
})
export class ProfileComponent implements OnInit{
  
  loading = signal(false);

  name: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.name = this.authService.user()?.name || '';
    this.email = this.authService.user()?.email || '';
  }

  async handleSubmit() {
    this.loading.set(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    this.authService.updateProfile(this.name, this.email);
    this.loading.set(false);
    this.toastService.success('Profile updated successfully!');
  }

  getOrderCount(): number {
    return JSON.parse(localStorage.getItem('orders') || '[]').length;
  }

  getTotalSpent(): number {
    return JSON.parse(localStorage.getItem('orders') || '[]')
      .reduce((sum: number, order: any) => sum + order.total, 0);
  }
}