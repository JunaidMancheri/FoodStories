import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog'
import { DialogBoxComponent } from '@food-stories/users-client/auth/ui/dialog-box';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}


  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }


  openDialog(content: string) {
    this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Info',
        content,
      },
    });
  }

  showSomethingWentWrong() {
    this.openSnackBar('Something went wrong. Please try again later');
  }


}