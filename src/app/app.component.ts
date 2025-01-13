import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { NavbarComponent } from './navbar/navbar.component';
@Component({
  selector: 'app-root',
  imports: [Toast, RouterOutlet, ButtonModule, BadgeModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
  standalone: true
})
export class AppComponent {
  constructor(private messageService: MessageService) {}
  title = 'poke-dex';

  show() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
  }
}


