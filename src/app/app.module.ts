import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// tslint:disable-next-line:import-spacing
import { NavMenuComponent } from  './core/navmenu/navmenu.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { FooterComponent } from './core/footer/footer.component';
import { ActivityForecastListComponent } from './activities/activity-list/activity-forecast-list.component';
import { ActivityListResolver } from './_resolvers/activity-list.resolver';
import { PostListResolver } from './_resolvers/post-list.resolver';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { MessagesService } from './services/messages.service';
import { ThemesOfWeekComponent } from './themes/themes-of-week/themes-of-week.component';
import { MessageListResolver } from './_resolvers/message-list.resolver';
import { SociaMediaTypeListResolver } from './_resolvers/social-media-type-list.resolver';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { HqDashboardSubMenuComponent } from './core/hq-dashboard-sub-menu/hq-dashboard-sub-menu.component';
import { ThemeSubMenuComponent } from './core/theme-sub-menu/theme-sub-menu.component';
import { MessageResolver } from './_resolvers/message.resolver';
import { ThemeCardComponent } from './themes/theme-card/theme-card.component';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';
import { AutosizeDirective } from './_directives/autosize.directive';
import { ClickPreventDefaultDirective } from './_directives/click-preventdefault.directive';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SocialMediaListInputComponent } from './social-media/social-media-list-input/social-media-list-input.component';
import { SociaMediaPostListResolver } from './_resolvers/social-media-post-list.resolver';
import { SocialMediaPostsService } from './services/socialMediaPosts.service';
// tslint:disable-next-line:max-line-length
import { DeletePostConfirmationModalComponent } from './social-media/delete-post-confirmation-modal/delete-post-confirmation-modal.component';
import { SocialMediaPostListComponent } from './social-media/social-media-post-list/social-media-post-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AppConfigService } from './app-config.service';
import { PluralizeKindPipe } from './_pipes/pluralize-kind.pipe';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
      return appConfig.loadAppConfig();
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PostListComponent,
    FooterComponent,
    ActivityForecastListComponent,
    ThemesOfWeekComponent,
    ThemeListComponent,
    HqDashboardSubMenuComponent,
    ThemeSubMenuComponent,
    ThemeCardComponent,
    ThemeFormComponent,
    AutosizeDirective,
    ClickPreventDefaultDirective,
    TimeAgoPipe,
    SocialMediaListInputComponent,
    DeletePostConfirmationModalComponent,
    SocialMediaPostListComponent,
    HasRoleDirective,
    PluralizeKindPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    OAuthModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AppConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFn,
        multi: true,
        deps: [AppConfigService]
    },
    ApiService,
    MessagesService,
    SocialMediaPostsService,
    AuthService,
    ActivityListResolver,
    MessagesService,
    PostListResolver,
    MessageListResolver,
    SociaMediaTypeListResolver,
    MessageResolver,
    SociaMediaPostListResolver,
    AuthGuard
  ],
  entryComponents: [
    DeletePostConfirmationModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
