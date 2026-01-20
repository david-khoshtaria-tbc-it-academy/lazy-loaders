import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { Subject } from 'rxjs';
import { ButtonComponent } from './button/button';
import { DailyChartComponent } from './daily-chart/daily-chart';
import { RegisterComponent } from './register/register';
import { AuthService } from './authservice';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    TableModule,
    DividerModule,
    ButtonComponent,
    DailyChartComponent,
    ReactiveFormsModule,
    RegisterComponent
    
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  public authService = inject(AuthService);
  ngOnInit() {
    this.authService.restoreUser();
  }
}
