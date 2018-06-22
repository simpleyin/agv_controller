import { Component, Inject, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-shell.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * app的登录组件
 * 能够动态的加载，卸载
 * 
 */
export class LoginComponent implements AfterViewInit {
  userName: string;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dialog.open(DataDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });
  }

}

@Component({
  selector: "data-dialog",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class DataDialog {
  constructor(
    public dialogRef: MatDialogRef<DataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router
  ) { }

  /**
   * login without checkout form
   */
  onLogin(): void {
    console.log("login");
    this.dialogRef.close();
    this.router.navigateByUrl("/controller");
  }
}