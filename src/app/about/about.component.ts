import { Component } from '@angular/core';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-about',
  imports: [CardModule],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
