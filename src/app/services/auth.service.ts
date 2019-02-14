import { Injectable } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { Configuration } from '../configuration';
import { authConfig } from '../auth.config';
import { BehaviorSubject } from 'rxjs';
import { User } from '../view-models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private oauthService: OAuthService, private configuration: Configuration) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events.subscribe(e => {
      switch (e.type) {
        case 'token_received':
          this.setAuthUser();
          break;
      }
    });
    this.setAuthUser();
  }

  setAuthUser() {
    this.configuration.accessToken = this.oauthService.getAccessToken();
    const identityClaims = this.oauthService.getIdentityClaims() || {};
    let user = {
      user_roles: identityClaims['user_roles'] || [],
      access_token: this.configuration.accessToken,
      name: identityClaims['name'] || ''
    } as User;
    this.currentUserSubject.next(user);
  }

  get loggedIn() { return this.oauthService.hasValidAccessToken() }
  get identityClaims() { return this.oauthService.getIdentityClaims() || {}; }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logOut() {
    this.oauthService.logOut();
  }

  tryLogin() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  roleMatch(allowedRoles: Array<String>): boolean {
    if (!this.loggedIn) {
      return false;
    }
    
    return allowedRoles.some(r => this.currentUserSubject.value.user_roles.includes(r));
  }
}
