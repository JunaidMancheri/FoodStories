import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from './confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class ConfirmDialogService {
  constructor(private confirmDialog: MatDialog) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openDialog(data?: ConfirmDialogData): Observable<any> {
    return this.confirmDialog
      .open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {data})
      .afterClosed();
  }
}
