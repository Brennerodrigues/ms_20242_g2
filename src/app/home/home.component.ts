import { Component, EventEmitter } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import { Output } from '@angular/core';
import { Status } from '../app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Output() update = new EventEmitter<Status>();
  
  callUnity(){
    this.update.emit("Exercises");
  }
}
