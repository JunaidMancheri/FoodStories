import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface ConfirmDialogData {
  title?: string;
  content?: string;
  yesButton?: string;
  noButton?: string
}

@Component({
  selector: 'fs-confirm-edit-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
  imports: [MatButtonModule, CommonModule, MatDialogModule],
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData ) {}
}