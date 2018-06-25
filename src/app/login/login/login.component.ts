import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from "@angular/animations";
import {DOCUMENT} from '@angular/common';

/**
 * app的登录组件
 * 能够动态的加载，卸载
 * 
 */
@Component({
  selector: 'app-login',
  templateUrl: './login-shell.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements AfterViewInit {
  userName: string;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dialog.open(DataDialog, {
      width: '250px',
      //如何添加className到创建的dialog元素中
      panelClass: "background",
      data: { name: this.name, animal: this.animal }
    });
  }

}

@Component({
  selector: "data-dialog",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  animations: [
    trigger("loginBtn", [
      state("inactive", style({
        display: "block",
      })),
      state("active", style({
        display: "none",
      })),
      transition('inactive => active', animate('0ms ease-in')),
      transition('active => inactive', animate('0ms ease-out'))
    ]),
    trigger("loginIcon", [
      state("inactive", style({
        display: "none",
        transform: "scale(0.1)"
      })),
      state("active", style({
        display: "block",
        transform: "scale(1.0)"
      })),
      transition('inactive => active', animate('0ms ease-in')),
      transition('active => inactive', animate('0ms ease-out'))
    ]),
    trigger("loginDialog", [
      state("inactive", style({
        transform: "rotate(30deg)"
      })),
      state("active", style({
        transform: "rotate(30deg)"
      })),
      transition('inactive => active', animate('0ms ease-in')),
      transition('active => inactive', animate('0ms ease-out'))
    ])
  ]
})
export class DataDialog {
  public loginState = "inactive";

  constructor(
    public dialogRef: MatDialogRef<DataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  toggleLoginBtn(): void {
    this.loginState = this.loginState === "active" ? "inactive" : "active";
  }

  // ngAfterViewInit(): void {
  //   this._document.querySelector("mat-dialog-container").setAttribute("[@loginDialog]", "loginState");
  // }

  /**
   * login without checkout form
   */
  onLogin(): void {
    this.toggleLoginBtn();
    setTimeout(() => {
      this.dialogRef.close();
      this.router.navigateByUrl("/controller");
    }, 1000);
  }
}