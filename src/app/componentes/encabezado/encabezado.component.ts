import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  public personas:Persona[] = [];
  isUserLogged: Boolean = false;

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



}
