import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleIconComponent } from './icons/google-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { FacebookIconComponent } from './icons/facebook-icon.component';
import { TwitterIconComponent } from './icons/twitter-icon.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [
    GoogleIconComponent,
    FacebookIconComponent,
    TwitterIconComponent,
  ],
  exports: [GoogleIconComponent, FacebookIconComponent, TwitterIconComponent],
})
export class IconsModule {}
