import { Component, OnInit } from '@angular/core';
import { EducacionService } from './educacion.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Educacion } from './educacion';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  public educaciones: Educacion[] = [];
  isUserLogged: Boolean = false;
  public editEducacion: Educacion;
  public deleteEducacion: Educacion;
 
  constructor(private educacionService: EducacionService,
    private authService: AuthService) {}
  
  ngOnInit(): any {
   
    this.isUserLogged = this.authService.isUserLogged();
    this.getEducacion();
  }

public getEducacion():void{
  this.educacionService.getEducacion().subscribe(
    (response: Educacion[])=>{
      this.educaciones = response;
    },
    (error: HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}

public onOpenModal(educacion: Educacion, mode: string): void {
  const container = document.getElementById('estudioscontainer')
  const button = document.createElement('button');
  button.type ='button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add'){
    button.setAttribute('data-target', '#addEducacionModal');
  }
  if (mode === 'edit'){
    this.editEducacion = educacion;
    button.setAttribute('data-target', '#updateEducacionModal');
  }
  if (mode === 'delete'){
    this.deleteEducacion = educacion;
    button.setAttribute('data-target', '#deleteEducacionModal');
  }
  container.appendChild(button);
  button.click();

}
public onAddEducacion(addForm: NgForm): void{
  document.getElementById('add-educacion-form').click();
  this.educacionService.addEducacion(addForm.value).subscribe(
    (response: Educacion) => {
      console.log(response);
      this.getEducacion();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
}

public onUpdateEducacion(educacion: Educacion): void{

  this.educacionService.updateEducacion(educacion).subscribe(
    (response: Educacion) =>{
      console.log(response);
      this.getEducacion();
    },
    (error: HttpErrorResponse) =>{
      alert(error.message);
    }
  );

}


public onDeleteEducacion(educacionId: number):void{
  this.educacionService.deleteEducacion(educacionId).subscribe(
    (response: void) =>{
      console.log(response);
      this.getEducacion();
    },
    (error: HttpErrorResponse) =>{
      alert(error.message);
    }
  );
}



}
