import { Component, OnInit } from '@angular/core';
import { TaskTrackerComponent } from './task-tracker/task-tracker.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskTrackerComponent],
  template: `
    <div class="app-container">
      <h1>Task Tracker</h1>
      <app-task-tracker></app-task-tracker>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 2rem;
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(private snackBar: MatSnackBar) {
    console.log('%c[App] Component constructed', 'color: #FF9800; font-weight: bold;');
  }

  ngOnInit() {
    console.log('%c[App] Component initialized', 'color: #FF9800; font-weight: bold;');
    this.snackBar.open('App initialized', 'OK', { duration: 2000 });
  }
}
