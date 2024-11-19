import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Status } from '../app.component';

type ButtonTypes = "Marcar" | "Refazer" | "Continuar";

// ! COLOCAR CLASSES DIFERENTES PRA CADA TIPO DE BOTAO
@Component({
  selector: 'ex-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="{'marca-selecao':true, 'mark':typeButton=='Marcar', 'retry':typeButton=='Refazer', 'pass':typeButton=='Continuar'}" (click)="action()" >
        <img [src]="'assets/images/exercises/'+imgs[typeButton]" alt="informacao atividade">
    </div>
  `, 
  styleUrls: ['exercises.component.css']
})
export class ExButton{
  @Input() typeButton: ButtonTypes = "Marcar";
  @Input() action: ()=>void = ()=>{};

  imgs = {
    "Marcar": "check.png",
    "Refazer": "redo.png",
    "Continuar": "arrow.png"
  }
}

@Component({
  selector: 'ex-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./option.component.html", 
  styleUrls: ['./option.component.css', 'exercises.component.css']
})
export class Option{
  @Input() optionModel: number = 1;
  @Input() optID: number = 0;

  @Input() imgSource: string = '';
  @Input() optLabel: string = '';
  @Input() selected: number = -1;

  @Output() select = new EventEmitter<number>();

  callSelection(){
    this.select.emit(this.optID); 
  }
}

interface ActOptions {[key: number]: string[][][]}
interface ActAnswers {[key: number]: number[]}

type Mode = "Doing" | "Win" | "Miss" | "Info" | 'Finish';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [Option, ExButton, CommonModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {
  // Variável fornecida pelo componente App que vai dizer qual nível e qual modelo de atividade tem que ser carregado (padrão: modelo 1, nível 1)
  @Input() activityID: number[] = [1,1];
  @Input() numberOfOptions: number = 0;

  mode: Mode = "Info";

  actOptions: ActOptions = {
    1: [
      [["A-ba-ca-te", "avocado.png"], ["Á-gua", "water.png"], ["A-çú-car", "sugar.png"]],
      [["Bró-co-lis", "broccoli.png"], ["Bor-bo-le-ta", "butterfly.png"], ["Ba-ra-ta", "cockroach.png"]],
      [["Ca-me-lo", "camel.png"], ["Ce-nou-ra", "carrot.png"], ["Ca-va-lo", "horse.png"]]
    ],
    2: [
      []
    ]
  }
  answers: ActAnswers = {
    1: [3, 1, 2]
  }
  
  selectedOption: number = -1;
  updateSelected(id: number){
    if(this.mode=='Doing'){
      this.selectedOption = id;
    }
  }

  actProgress: number = 0;

  updateMode(){
    if(this.selectedOption>=0 && this.mode=='Doing'){
      if(this.selectedOption+1 == this.answers[this.activityID[0]][this.activityID[1]-1]){
        if(this.actProgress < 100) this.actProgress += (105/this.answers[this.activityID[0]].length);
        let progressBar = document.getElementById("progress");
        if(progressBar){
          progressBar.style.width = `${this.actProgress}%`;
        }
        this.mode = "Win";
      }else{
        this.mode = "Miss";
        let wrongSelection = document.querySelector(".selected");
        if(wrongSelection){
          wrongSelection.classList.add("wrongSelection");
        }
      }
    }
  }

  retry(){
    this.mode="Doing";
    this.selectedOption=-1;
    let wrongSelection = document.querySelector(".selected");
    if(wrongSelection){
        wrongSelection.classList.remove("wrongSelection");
    }
  }

  getNextEx(){
    this.selectedOption=-1;
    if(this.activityID[1]==this.actOptions[this.activityID[0]].length){
      // this.activityID[0]+=1;
      this.activityID[1]=1;
      this.mode="Finish";
    }else{
      this.mode="Doing";
      this.activityID[1]+=1;
    }

  }

  pullNextActivity(){  
    this.mode="Info";
    this.activityID[0]+=1;
    this.activityID[1]=1;
  }

  @Output() update = new EventEmitter<Status>();
  goBackHome(){
    this.update.emit("Home");
  }

  ngOnInit() {
    // Mantém a contexto das funções sempre nesse componente, mesmo quando chamado em outros.
    this.updateMode = this.updateMode.bind(this);
    this.retry = this.retry.bind(this);
    this.getNextEx = this.getNextEx.bind(this);
  }
}


