import { Component, OnInit } from '@angular/core';
import { NgxWebsocketService } from "ngx-websocket";
import { trigger, style, state, transition, animate } from '@angular/animations';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
        animate(300)
      ]),
      transition("active => inactive", [
        style({
          transform: "translateY(-100%)"
        }),
        animate(300)
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
  public agvArr: Array<string> = [];

  constructor(private websocketService: NgxWebsocketService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "add",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/img/svg/add.svg")
    )
  }

  ngOnInit(): void {
    this.websocketService.open("ws://echo.websocket.org").on("open", d => {
      d.websocket.send("hello world");
    }).on("message", d => {
      console.log(d.event.data);
    })
    for (let i = 0; i < 7; i++) {
      this.agvArr.push("AGV " + (i + 1));
    }
  }

  clickme(): void {
    alert("click me");
  }

  toggleControlState(): void {
    console.log("toggle");
    this.control_dialog_class = this.control_dialog_class === "control-dialog" ? "control-dialog-full" : "control-dialog";
    this.controlState = this.controlState === "inactive" ? "active" : "inactive";
  }

}
