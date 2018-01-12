import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs/Observable';
import { Item } from './domain/item';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  box1Data:Observable<Item[]>;
  box2Data:Observable<Item[]>;
  box3Data:Observable<Item[]>;

  constructor(private dataSvc:DataService){}

  ngOnInit(){
    this.box1Data=this.dataSvc.getItems(10000,"Widget");
    this.box2Data=this.dataSvc.getItems(4000,"Gidget");
    this.box3Data=this.dataSvc.getItems(12000,"Fidget");
  }

}
