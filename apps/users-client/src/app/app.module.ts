import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/feature/register/register.component';
import { UsersClientWebShellModule } from '@food-stories/users-client/web-shell'

@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [BrowserModule, UsersClientWebShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
