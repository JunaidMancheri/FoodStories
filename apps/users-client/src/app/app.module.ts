import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@food-stories/users-client/shared/config';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { appRoutes } from './app.routes';
import { AppInitEffects } from './store/app.effects';
import { appReducer } from './store/app.reducers';
import { HttpService } from './http.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
    MatProgressBarModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    StoreModule.forRoot(
      {user: appReducer},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([AppInitEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
