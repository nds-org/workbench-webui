import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';

import { UserSettingsComponent } from './user-settings.component';
import { routes } from './user-settings.routes';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes), SharedModule, MatDialogModule, MaterialModule],
  declarations: [
    UserSettingsComponent
  ],
  entryComponents: [],
})
export class UserSettingsModule { }
