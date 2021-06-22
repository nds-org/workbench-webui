import { ChangeDetectionStrategy, Component, OnChanges, OnInit } from '@angular/core';
import { Service as Spec } from '@api/models';
import { ApiService } from '@api/services';
import { BaseComponent } from '~/app/framework/core';
import { routeAnimation } from '~/app/shared';

@Component({
  templateUrl: './all-apps.component.html',
  styleUrls: ['./all-apps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class AllAppsComponent extends BaseComponent implements OnInit, OnChanges {
  searchQuery = '';

  allApps: Array<Spec> = [];
  filteredApps: Array<Spec> = [];

  constructor(private readonly api: ApiService) {
      super();
  }

  ngOnInit(): void {
    this.api.getServices().subscribe(specs => {
      this.allApps = specs.data;
    });
    this.filteredApps = this.allApps.filter(spec => JSON.stringify(spec).indexOf(this.searchQuery) !== -1);
  }

  ngOnChanges(): void {
    this.filteredApps = this.allApps.filter(spec => JSON.stringify(spec).indexOf(this.searchQuery) !== -1);
  }

  submitSearch(query: string): void {
      // console.log(`Query submitted: ${query}`);
  }
}
