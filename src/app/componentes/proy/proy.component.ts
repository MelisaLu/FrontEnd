import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { ProyectosService } from './Proyectos.service';
import { Proyectos } from './Proyectos';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-proy',
  templateUrl: './proy.component.html',
  styleUrls: ['./proy.component.css']
})
export class ProyComponent implements OnInit {
  public proyectoss: Proyectos[]= [];
  isUserLogged: Boolean = false;

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



}
