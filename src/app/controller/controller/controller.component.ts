import { Component, OnInit } from '@angular/core';
import { NgxWebsocketService } from "ngx-websocket";
import { trigger, style, state, transition, animate } from '@angular/animations';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Agv } from '../../meta/agv';

/**
 * TODO
 * 1. toggle controler btn 可以移动
 */
@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css'],
  animations: [
    trigger("choiceTableState", [
      transition("inactive => active", [
        style({
          transform: "translateY(-100%)"
        }),
        animate(300)
      ]),
      transition("active => inactive", [
        style({
          transform: "translateY(100%)"
        }),
        animate(300)
      ]),

    ]),
    trigger("controlBarState", [
      transition("inactive => active", [
        style({
          transform: "translateY(100%)"
        }),
        animate(200)
      ]),
      transition("active => inactive", [
        style({
          transform: "translateY(-100%)"
        }),
        animate(200)
      ]),
    ]),
    trigger("toggleBtnState", [
      state("inactive", style({

      })),
      state("active", style({
        transform: "rotate(45deg)"
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class ControllerComponent implements OnInit {
  public controlState: string = "inactive";
  public control_dialog_class: string = "control-dialog";
  public agvs: Array<Agv> = [];
  public color: string = "primary";
  private currentAgv: number;

  constructor(private websocketService: NgxWebsocketService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "add",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/img/svg/add.svg")
    )
  }

  ngOnInit(): void {
    for (let i = 0; i < 7; i++) {
      this.agvs.push(new Agv("AGV " + (i + 1), i));
      this.agvs[i].selected = true;
    }
  }
  
  toggleControlState(): void {
    this.control_dialog_class = this.control_dialog_class === "control-dialog" ? "control-dialog-full" : "control-dialog";
    this.controlState = this.controlState === "inactive" ? "active" : "inactive";
  }

  /**
   * 改变当前所选AGV
   */
  selectCurrentAgv(target: HTMLElement): void {
    let id: number;
    if (!target.id) {
      target = target.parentElement;
      id = parseInt(target.id);
    } else {
      id = parseInt(target.id);
    }
    this.currentAgv = id;
    this.agvs.forEach((value, index) => {
      if (index === id) {
        value.color = "primary";
      } else {
        value.color = "";
      }
    })
  }


  /**
   * test
   */
  clickme(): void {
    alert("click me");
  }

  test(): void {
    this.agvs[0].disabled = true;
  }

}
