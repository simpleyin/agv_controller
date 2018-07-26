export class workStation {
    id: number | string;
    name: string;
    cx: number;
    cy: number;
    r: number;
    DEFAULT_COLOR = "#009688";
    CHOOSEN_COLOR = "#673ab7";
    
    constructor(id, cx, cy, r, name?) {
        this.id = id;
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.name = "workStation" + id;
    }

    public calculateDistance(x: number, y: number): number {
        return Math.sqrt(Math.pow((this.cx - x), 2) + Math.pow((this.cy - y), 2));
    }

    /**
     * 检查当前点是否存在于该站点内
     * @param x 
     * @param y 
     */
    public checkInside(x: number, y: number): boolean {
        return this.calculateDistance(x, y) < this.r ? true : false;
    }


}