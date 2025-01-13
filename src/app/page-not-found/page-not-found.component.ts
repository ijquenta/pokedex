import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  imports:[ButtonModule]
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']); // Adjust the route as necessary
  }
}
