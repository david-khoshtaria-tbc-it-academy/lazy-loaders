import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authservice';

export const authGuard = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  console.log('გარდი ამოწმებს ტოკენს:', token);

  if (token && token !== 'undefined' && token !== 'null') {
    return true;
  }

  const retryToken = localStorage.getItem('token');
  if (retryToken) return true;

  console.error('გარდმა ტოკენი ვერ იპოვა, აბრუნებს ლოგინზე');
  return router.parseUrl('/login');
};