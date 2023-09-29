import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UsersClientWebShellModule } from '@food-stories/users-client/web-shell'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar' 
import { HttpClientModule } from '@angular/common/http';
import { initializeApp,provideFirebaseApp, } from '@angular/fire/app';
import { environment } from '@food-stories/users-client/shared/config';
import { provideAuth,getAuth } from '@angular/fire/auth';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    UsersClientWebShellModule,
    MatProgressBarModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
