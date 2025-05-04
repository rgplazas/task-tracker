import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-message',
  imports: [MatIconModule],
  standalone: true,
  template: `
    <div class="snackbar-content">
      <mat-icon>{{ data.icon }}</mat-icon>
      <span>{{ data.message }}</span>
    </div>
  `,
  styles: [`
    .snackbar-content {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }
    mat-icon {
      font-size: 20px;
    }
  `]
})
export class SnackbarMessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
