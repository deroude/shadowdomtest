import { Injectable } from '@angular/core';
import { Item } from '../domain/item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class DataService {

  constructor() { }

  getItems(n: number, tag: string): Observable<Item[]> {
    let re: Item[] = [];
    for (var i: number = 0; i < n; i++) {
      re.push({ id: i, description: tag + " number " + i });
    }
    return Observable.of(re).delay(100);
  }

}
