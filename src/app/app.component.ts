import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ExercisesComponent } from './exercises/exercises.component';

export type Status = 'Login' | 'Home' | 'Exercises';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginComponent, ExercisesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LetraLivre';
  status: Status = 'Login';

  // Função que muda o status da página com base num evento recebido do elemento filho
  changeStatus(targetPage: Status){
    this.status = targetPage;
  }
}
