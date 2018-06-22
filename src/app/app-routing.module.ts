import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { ControllerComponent } from './controller/controller/controller.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "controller",
    component: ControllerComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
