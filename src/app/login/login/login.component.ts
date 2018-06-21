import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * app的登录组件
 * 能够动态的加载，卸载
 * 
 */
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
