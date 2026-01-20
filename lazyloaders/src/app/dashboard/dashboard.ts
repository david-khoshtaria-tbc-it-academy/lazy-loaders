import { Component, inject } from '@angular/core';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <header>
        <h1>Analytics Dashboard</h1>
        <div class="user-badge">
          @if (auth.currentUser()) {
            <span>მომხმარებელი: <b>{{ auth.currentUser().username }}</b></span>
            <button (click)="auth.logout()">Log out</button>
          }
        </div>
      </header>
      
      <div class="content">
         <p>მოგესალმები, {{ auth.currentUser()?.username }}. აქ შენი სტატისტიკაა.</p>
      </div>
    </div>
  `,
  styles: [`.dashboard { padding: 20px; } header { display: flex; justify-content: space-between; }`]
})
export class DashboardComponent {
  public auth = inject(AuthService);
}