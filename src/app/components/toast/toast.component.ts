import { Component, effect } from '@angular/core';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { toast } from 'ngx-sonner';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-toast',
  imports: [HlmToaster],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  constructor(private toastService: ToastService) {
    effect(() => {
      const allToasts = this.toastService.toastSignal();
      for (const t of allToasts) {
        toast(t.title, {
          description: t.description,
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
          duration: 2000,
          position: 'top-right'
        });
      }
      // Clear processed toasts to avoid duplicates
      if (allToasts.length > 0) {
        this.toastService.clear();
      }
    });
  }
}
