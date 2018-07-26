import { Injectable } from '@angular/core';
import { Observable, Subscription, Subject } from '../../../node_modules/rxjs';
import { EventEmitter } from '../../../node_modules/protractor';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractService {
  private mapEditMode = new Subject<string>();
  mapEditMode$ = this.mapEditMode.asObservable(); //asObservable的作用：避免暴露出next()等观察者才有的api。

  constructor() {
    //this.mapEditMode.subscribe(x => console.log(x));
  }

  changeMapEditMode(mode: string) {
    this.mapEditMode.next(mode);
  }

}
