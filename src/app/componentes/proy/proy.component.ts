import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { ProyectosService } from './Proyectos.service';
import { Proyectos } from './Proyectos';

@Component({
  selector: 'app-proy',
  templateUrl: './proy.component.html',
  styleUrls: ['./proy.component.css']
})
export class ProyComponent implements OnInit {
  public proyectoss: Proyectos[]= [];
  constructor(private proyectosService: ProyectosService) { }

  ngOnInit() {
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



}
