import { Directive, Input, TemplateRef, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, Inject, ComponentRef, Injector } from '@angular/core';
import { SvgService } from '../map/svg.service';
import { SvgComponent } from './svg.component';
import { DOCUMENT } from '@angular/common';
import { _document } from '@angular/platform-browser/src/browser';

/**
 * 结构型指令的作用：塑造或重塑DOM的结构，如添加，维护或删除元素
 */
@Directive({
  selector: "ss"
})
export class SvgDirective {
  container: ComponentRef<any>;
  svg: any;

  constructor(
    private templateRef: TemplateRef<any>,
    @Inject(DOCUMENT) _document: any,
    private viewContainer: ViewContainerRef,  //获取指令作用的元素视图访问权限,返回的ViewContainerRef如何插入其他子元素？
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentFactory: ComponentFactory<any>,
    private injector: Injector,
    private svgService: SvgService) {
      let factory = this.componentFactoryResolver.resolveComponentFactory(SvgComponent);
      let componentRef = factory.create(injector);
      let view = componentRef.hostView;
      
    }
  
    /**
     * 根据指令的锚点，在其中创建svg元素
     */
    createContext(): void {

    }

}
