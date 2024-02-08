import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string, options?: MatSnackBarConfig) {
    const config: MatSnackBarConfig = options || {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
    };
    return this._snackBar.open(message, action || 'close', config);
  }
}
