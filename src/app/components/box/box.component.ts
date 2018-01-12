import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/combineLatest';
import { Item } from '../../domain/item';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  public static SCROLL_SIZE = 30;
  public static ROW_HEIGHT = 21;

  @Input()
  source: Observable<Item[]>;

  @Input()
  title: string;

  collapsed: boolean = false;

  cache: Item[] = [];

  searchTerm: string;

  before = 0
  after = 0;

  constructor() { }

  scroll$: BehaviorSubject<number> = new BehaviorSubject(0);
  filter$: BehaviorSubject<Item[]> = new BehaviorSubject([]);
  select$: BehaviorSubject<Item[]> = new BehaviorSubject([]);

  displayed: Item[];

  @Output()
  selectionChange: EventEmitter<Item[]> = new EventEmitter();

  ngOnInit() {
    this.source.subscribe(s => {
      this.after = (s.length - BoxComponent.SCROLL_SIZE) * BoxComponent.ROW_HEIGHT;
      this.displayed = s.slice(0, BoxComponent.SCROLL_SIZE);
      this.cache = s;
      this.filter$.next(s);
    });

    Observable.combineLatest(this.scroll$.debounceTime(100), this.filter$).subscribe(tpl => {
      let h = tpl[0];
      let its = tpl[1];
      let n = Math.floor(h * its.length);
      this.before = n * BoxComponent.ROW_HEIGHT;
      this.after = Math.max(0, (its.length - BoxComponent.SCROLL_SIZE - n) * BoxComponent.ROW_HEIGHT);
      this.displayed = its.slice(n, n + BoxComponent.SCROLL_SIZE);
    });
  }

  onScroll(event: any) {
    this.scroll$.next(event.target.scrollTop / event.target.scrollHeight);
  }

  filter() {
    this.filter$.next(this.cache.filter(i => i.description.includes(this.searchTerm)));
  }

  select(){
    console.log("trigger");
    this.select$.next(this.cache.filter(i=>i.selected));
  }
}
