import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthInterceptor } from './shared/okta/auth.interceptor';

const oktaConfig = {
  issuer: 'https://dev-54597357.okta.com/oauth2/default',
  clientId: '0oab6mq3y7JbQJiq75d7',
  redirectUri: '/callback',
  scopes: ['openid', 'profile', 'email']
};

const oktaAuth = new OktaAuth(oktaConfig);



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OktaAuthModule,
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }