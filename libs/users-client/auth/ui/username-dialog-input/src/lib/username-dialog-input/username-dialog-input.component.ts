import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fs-username-dialog-input',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './username-dialog-input.component.html',
  styleUrls: ['./username-dialog-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameDialogInputComponent {
  constructor(
    public dialogRef: MatDialogRef<UsernameDialogInputComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
