import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CoreModule } from './modules/core/core.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
  { path: 'chat', loadChildren: './modules/chat/chat.module#ChatModule' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './modules/sign-up/sign-up.module#SignUpModule' }
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, CoreModule, FontAwesomeModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
