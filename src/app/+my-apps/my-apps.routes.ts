import { AuthGuard } from '@api/auth-guard';

import { MyAppsComponent } from './my-apps.component';

export const routes = [
  {
    path: '',
    component: MyAppsComponent,
    // canActivate: [AuthGuard],
    data: {
      meta: {
        title: 'MY_APPS.PAGE_TITLE',
        description: 'MY_APPS.META_DESCRIPTION'
      }
    }
  }
];
