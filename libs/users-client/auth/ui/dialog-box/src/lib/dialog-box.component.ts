import { Component, Inject } from "@angular/core";
import { MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector:'fs-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
  standalone: true,
  imports: [MatDialogModule]
})
export class DialogBoxComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string}) {}

}