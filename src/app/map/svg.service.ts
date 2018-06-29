import { Injectable, ViewContainerRef, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  constructor() { }

  /**
   * 根据<SVG>元素创建svg上下文
   * 
   * @param containerRef 
   */
  createContext(containerRef: ElementRef): void {

  }
}
