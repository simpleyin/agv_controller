import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  logining: Boolean = false;

  constructor() { }

  ngOnInit() {
    //TODO 添加整流罩
    
  }

  login() {
    console.log("login");
    this.logining = true;
    setTimeout(this.navToControllBar, 500);
  }

  navToControllBar() {

  }

}
