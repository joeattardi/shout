import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';

import { CoreModule } from './modules/core/core.module';

import { reducers } from './reducers';
import { CoreEffects, UserEffects } from './effects';

const appRoutes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chat', loadChildren: './modules/chat/chat.module#ChatModule' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './modules/sign-up/sign-up.module#SignUpModule' }
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    CoreModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Shout Store DevTools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([CoreEffects, UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
