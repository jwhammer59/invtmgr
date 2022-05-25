import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Fire Modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './common/nav/nav.component';
import { HomeComponent } from './common/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

import { PrimeModule } from 'src/app/prime/prime';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

// Angular Fire Auth Imports
import { AuthService } from './services/auth.service';
import { AuthGuard } from './components/auth/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    PrimeModule,
  ],
  exports: [PrimeModule],
  providers: [MessageService, ConfirmationService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
