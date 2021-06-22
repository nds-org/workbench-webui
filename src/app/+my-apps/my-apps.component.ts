import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Stack } from '@api/models';
import { ApiService } from '@api/services';
import { BaseComponent } from '~/app/framework/core';
import { routeAnimation } from '~/app/shared';

@Component({
  templateUrl: './my-apps.component.html',
  styleUrls: ['./my-apps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class MyAppsComponent extends BaseComponent implements OnInit {
  apps: Array<Stack> = [];

  constructor(private readonly api: ApiService) {
      super();

  }

  ngOnInit(): void {
    this.api.getStacks().subscribe(apps => {
      this.apps = apps.data;
    });
  }

}
