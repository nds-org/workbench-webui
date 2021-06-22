import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '@framework/core';
import { routeAnimation } from '~/app/shared';

interface SiteTheme {
  name: string;
  value: number;
  cssPath?: string; // TODO
}

@Component({
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [routeAnimation]
})
export class UserSettingsComponent extends BaseComponent {
  currentFilter = 'public';

  themes: Array<SiteTheme> = [];
  selectedTheme: number;

  constructor() {
    super();

    this.themes = [
      { name: 'default', value: 0 },
      { name: 'dark', value: 1 },
    ];
    this.selectedTheme = 0;
  }
}
