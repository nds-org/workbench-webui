// import { AuthGuard } from '@ngx-auth/core';
import { MetaGuard } from '@ngx-meta/core';
import { AuthGuard } from '@shared/auth-guard';
import { ChangeLanguageComponent } from '~/app/framework/i18n';

import { MainComponent } from './layout/main.component';
import { LoginComponent } from './login/login.component';

export const routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'PUBLIC.LOGIN.PAGE_TITLE'
      }
    }
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'all-apps',
        loadChildren: './+all-apps/all-apps.module#AllAppsModule'
      },

      {
        path: 'my-apps',
        loadChildren: './+my-apps/my-apps.module#MyAppsModule'
      },
     // {
     //   path: 'settings',
     //   loadChildren: './+user-settings/user-settings.module#UserSettingsModule'
     // }
    ],
    canActivateChild: [MetaGuard, AuthGuard], // AuthGuard
    data: {
      i18n: {
        isRoot: true
      }
    }
  },
  {
    path: 'change-language/:languageCode',
    component: ChangeLanguageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
