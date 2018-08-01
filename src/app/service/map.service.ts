import { Injectable } from '@angular/core';
import { Map } from '../meta/map';
import { WorkStation } from '../meta/workStation';
import { WorkPath } from '../meta/workPath';

/**
 * 用于为地图元素提供数据存储，状态管理等服务
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: Map;

  constructor() {
    //拉去构建地图类的相关数据
    this.mock();
  }

  mock() {
    let wss = [0, 1, 2, 3, 4, 5].map((v, i, a) => {
      return new WorkStation(i, 100 + i * 100, 100 + i * 100, 5);
    });
    let wps = [0, 1, 2, 3, 4, 5].map((v, i, a) => {
      return new WorkPath(i, wss[i], i < a.length - 1 ? wss[i + 1] : wss[0]);
    })
    this.map = new Map(1);
    this.map.workStations = wss;
    this.map.workPaths = wps;
  }

  addWorkStation(ws: WorkStation): void {
    this.map.addWorkStation(ws);
  }
}

