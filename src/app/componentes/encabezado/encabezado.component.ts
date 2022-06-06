import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  public personas:Persona[] = [];
  isUserLogged: Boolean = false;
  public editPersona: Persona;

  constructor (private personaService: PersonaService,
    private authService: AuthService){}

  ngOnInit(): any {
    this.isUserLogged = this.authService.isUserLogged();
    this.getPersonas();
  }

  public getPersonas():void {
    this.personaService.getPersonas().subscribe(
      (response: Persona[])=>{
        this.personas = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

public onOpenModal(persona: Persona, mode: string): void {
  const container = document.getElementById('cont_inicio')
  const button = document.createElement('button');
  button.type ='button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  /*if (mode === 'add'){
    button.setAttribute('data-target', '#addPersonaModal');
  }*/
  if (mode === 'edit'){
    this.editPersona = persona;
    button.setAttribute('data-target', '#updatePersonaModal');
  }
  /*if (mode === 'delete'){
    button.setAttribute('data-target', '#deletePersonaModal');
  }*/ 
  container.appendChild(button);
  button.click();

}

public onUpdatePersona(persona: Persona): void{
  this.personaService.updatePersona(persona).subscribe(
    (response: Persona) =>{
      console.log(response);
      this.getPersonas();
    },
    (error: HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}

}
