import { WorkStation } from "./workStation";

/**
 * 地图路线类元数据
 */
export class WorkPath {
    id: number | string;
    x1: number | string; //起点坐标[x1, y1]
    y1: number;
    x2: number; //终点坐标[x2, y2]
    y2: number;
    from: WorkStation;
    arrive: WorkStation;
    fromWorkStationId: number | string; //作为起点的站点id
    arriveWorkStationId: number | string; //作为终点的站点id

    constructor(id: number, from: WorkStation, arrive: WorkStation) {
        this.from = from;
        this.arrive = arrive;
        this.x1 = from.cx;
        this.y1 = from.cy;
        this.x2 = arrive.cx;
        this.y2 = arrive.cy;
        this.fromWorkStationId = from.id;
        this.arriveWorkStationId = arrive.id;
    }

}