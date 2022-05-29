import { Component, OnInit } from '@angular/core';
import { EducacionService } from './educacion.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Educacion } from './educacion';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  public educaciones: Educacion[] = [];
  isUserLogged: Boolean = false;

  
  constructor(private educacionService: EducacionService,
    private authService: AuthService) {}
  
  ngOnInit(): any {
   
    this.isUserLogged = this.authService.isUserLogged();
    this.getEducacion();

  }

public getEducacion():void
{
  this.educacionService.getEducacion().subscribe(
    (response: Educacion[])=>{
      this.educaciones = response;
    },
    (error: HttpErrorResponse) =>{
      alert(error.message);
    }
  );

}

}
