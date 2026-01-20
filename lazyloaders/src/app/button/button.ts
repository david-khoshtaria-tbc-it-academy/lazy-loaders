import { Component, input, computed } from '@angular/core';

export type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [disabled]="disabled() || loading()"
      [class]="buttonClasses()"
      [attr.type]="type()"
    >
      @if (loading()) {
        <span class="spinner"></span>
        <span class="loading-text">Loading...</span>
      } @else {
        <ng-content select="[leftIcon]"></ng-content>
        <ng-content></ng-content>
        <ng-content select="[rightIcon]"></ng-content>
      }
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid transparent;
      gap: 8px;
      outline: none;
    }

    .btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-default { background: #007bff; color: white; }
    .btn-secondary { background: #e0f2fe; color: #0369a1; }
    .btn-destructive { background: #dc3545; color: white; }
    .btn-outline { background: transparent; border: 1px solid #007bff; color: #007bff; }
    .btn-ghost { background: transparent; border: none; }
    .btn-link { background: transparent; color: #007bff; text-decoration: underline; }

    .btn-sm { padding: 4px 10px; font-size: 12px; }
    .btn-md { padding: 8px 16px; font-size: 14px; }
    .btn-lg { padding: 12px 24px; font-size: 16px; }
    .btn-icon { padding: 8px; width: 40px; height: 40px; }

    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid currentColor;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      animation: rotation 1s linear infinite;
    }
    @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `]
})
export class ButtonComponent {
  variant = input<ButtonVariant>('default');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');

  buttonClasses = computed(() => {
    return `btn btn-${this.variant()} btn-${this.size()}`;
  });
}