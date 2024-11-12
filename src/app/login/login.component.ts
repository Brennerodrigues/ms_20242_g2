import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'login-input',
  standalone: true,
  imports: [],
  template: `<div class="inputDiv"><img [src]=imgSrc class="inputIcon"><input class="loginInput" [placeholder]=fieldName></div>`, 
  styleUrls: ['./login.component.css']
})
export class loginInput {
  @Input() fieldName: string = "";
  @Input() imgSrc: string = "";
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [loginInput, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginInputs: {label: string, imgUrl: string}[] = [{label:"Instituição", imgUrl:"assets/images/login/instituicao.png"}, 
                                                    {label:"Cargo", imgUrl: "assets/images/login/cargo.png"},
                                                    {label:"Nome", imgUrl: "assets/images/login/nome.png"},
                                                    {label:"Senha", imgUrl: "assets/images/login/senha.png"}];
}
