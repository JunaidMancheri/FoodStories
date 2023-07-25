import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'fs-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  animations: [
    trigger('moveLogo', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('500ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('500ms', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class AuthLayoutComponent {}
