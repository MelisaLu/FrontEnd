import { Component, OnInit } from '@angular/core';
import { Habilidades } from './habilidades';
import { HabilidadesService } from './habilidades.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  public habilidadess: Habilidades []=[];
  isUserLogged: Boolean = false;
  public editHabilidad: Habilidades;
  public deleteHabilidad: Habilidades;

  constructor( private habilidadesService: HabilidadesService,
    private authService: AuthService) { }

  ngOnInit(): any {
    this.isUserLogged = this.authService.isUserLogged();
    this.getHabilidades();

  }

  public getHabilidades():void {
    this.habilidadesService.getHabilidades().subscribe(
      (response: Habilidades[])=>{
        this.habilidadess = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onOpenModal(habilidad: Habilidades, mode: string): void {
    const container = document.getElementById('habilidadescontainer')
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addHabilidadModal');
    }
    if (mode === 'edit'){
      this.editHabilidad = habilidad;
      button.setAttribute('data-target', '#updateHabilidadModal');
    }
    if (mode === 'delete'){
      this.deleteHabilidad = habilidad;
      button.setAttribute('data-target', '#deleteHabilidadModal');
    }
    container.appendChild(button);
    button.click();
  
  }

  public onAddHabilidad(addForm: NgForm): void{
    document.getElementById('add-habilidad-form').click();
    this.habilidadesService.addHabilidades(addForm.value).subscribe(
      (response: Habilidades) => {
        console.log(response);
        this.getHabilidades();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  
  public onUpdateHabilidad(habilidad: Habilidades): void{
  
    this.habilidadesService.updateHabilidades(habilidad).subscribe(
      (response: Habilidades) =>{
        console.log(response);
        this.getHabilidades();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  
  }
  
  
  public onDeleteHabilidad(habilidadId: number):void{
    this.habilidadesService.deleteHabilidades(habilidadId).subscribe(
      (response: void) =>{
        console.log(response);
        this.getHabilidades();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

}
