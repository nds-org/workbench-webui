import { AuthGuard } from '@api/auth-guard';

import { AllAppsComponent } from './all-apps.component';

export const routes = [
  {
    path: '',
    component: AllAppsComponent,
    // canActivate: [AuthGuard],
    data: {
      meta: {
        title: 'ALL_APPS.PAGE_TITLE',
        description: 'ALL_APPS.META_DESCRIPTION'
      }
    }
  }
];
