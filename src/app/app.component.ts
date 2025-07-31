import { Component } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { toast } from 'ngx-sonner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shoppit-ng';
  // showToast() {
  //       toast('Event has been created', {
  //           description: 'Sunday, December 03, 2023 at 9:00 AM',
  //           action: {
  //               label: 'Undo',
  //               onClick: () => console.log('Undo'),
  //           },
  //           duration: 10000,
  //           position: 'top-right'
  //       });
  //   }
}
