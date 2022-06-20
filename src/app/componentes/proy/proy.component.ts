import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { ProyectosService } from './Proyectos.service';
import { Proyectos } from './Proyectos';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proy',
  templateUrl: './proy.component.html',
  styleUrls: ['./proy.component.css']
})
export class ProyComponent implements OnInit {
  public proyectoss: Proyectos[]= [];
  isUserLogged: Boolean = false;
  public editProyecto: Proyectos;
  public deleteProyecto: Proyectos;

  constructor(private proyectosService: ProyectosService,
    private authService: AuthService) { }

  ngOnInit(): any {
    this.isUserLogged = this.authService.isUserLogged();
    this.getProyectos();
  }

  public getProyectos():void {
    this.proyectosService.getProyectos().subscribe(
      (response: Proyectos[])=>{
        this.proyectoss = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onOpenModal(proyecto: Proyectos, mode: string): void {
    const container = document.getElementById('estudioscontainer')
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addProyectoModal');
    }
    if (mode === 'edit'){
      this.editProyecto = proyecto;
      button.setAttribute('data-target', '#updateProyectoModal');
    }
    if (mode === 'delete'){
      this.deleteProyecto = proyecto;
      button.setAttribute('data-target', '#deleteProyectoModal');
    }
    container.appendChild(button);
    button.click();
  }

    public onAddProyecto(addForm: NgForm): void{
      document.getElementById('add-proyecto-form').click();
      this.proyectosService.addProyectos(addForm.value).subscribe(
        (response: Proyectos) => {
          console.log(response);
          this.getProyectos();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    
    public onUpdateProyecto(proyecto: Proyectos): void{
    
      this.proyectosService.updateProyectos(proyecto).subscribe(
        (response: Proyectos) =>{
          console.log(response);
          this.getProyectos();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    
    }
    
    
    public onDeleteProyecto(proyectoId: number):void{
      this.proyectosService.deleteProyectos(proyectoId).subscribe(
        (response: void) =>{
          console.log(response);
          this.getProyectos();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }


  

}
