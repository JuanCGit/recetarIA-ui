import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.component.html',
  styleUrl: './profile.page.component.scss',
  standalone: true,
  imports: [FormsModule],
})
export class ProfilePageComponent {
}
