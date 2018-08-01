import { WorkStation } from "./workStation";
import { WorkPath } from "./workPath";

/**
 * 地图类元数据
 * 描述地图及其子元素的相关信息
 */
export class Map {
    id: number | string;
    name: string;
    state: string;
    workStations: WorkStation[];
    workPaths: WorkPath[];

    constructor(id: number | string) {
        this.id = id;
    }

    /**
     * 添加站点
     * @param workStation 
     */
    addWorkStation(workStation: WorkStation): void {
        this.workStations.push(workStation);
    }
}