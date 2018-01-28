import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { sortBy } from 'lodash';

import { Legislator } from './data/congress';
import { CongressService } from './data/congress.service';



@Injectable()
export class RegionRepsResolver implements Resolve<Legislator[]> {
  constructor(private congress: CongressService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Legislator[]> {
    const [ rootSegment ] = route.url;
    const postal = rootSegment.path.toUpperCase();

    if (this.congress.isLoading) {
      return this.congress.dataObservable.take(1).map(() => this.repsForPostal(postal));
    } else {
      return Observable.of(this.repsForPostal(postal));
    }
  }

  private repsForPostal(postal: string): Legislator[] {
    return sortBy(this.congress.repsForPostal(postal), ['sortingDistrict']);
  }
}