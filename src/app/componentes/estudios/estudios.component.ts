import { Component, OnInit } from '@angular/core';
import { EducacionService } from './educacion.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Educacion } from './educacion';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  public educaciones: Educacion[] = [];
  isUserLogged: Boolean = false;

  educationForm: FormGroup;

  
  constructor(private educacionService: EducacionService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.educationForm = this.formBuilder.group({
          id:[''],
          anio_inicio:['', [Validators.required]],
          anio_fin:['', [Validators.required]],
          tipoEdu:['',[Validators.required]],
          institucion:['',[Validators.required]],
          imageUrl:['',[Validators.required]]
        })

    }
  
  ngOnInit(): any {
   
    this.isUserLogged = this.authService.isUserLogged();
    this.getEducacion();

    this.reloadData();
  }

private reloadData(){
  this.educacionService.getEducacion().subscribe(
    (data) =>{
      this.educaciones = data;
      console.log(data);
    }
  );
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

private clearForm(){
  this.educationForm.setValue({
    id: '',
    anio_inicio :0,
    anio_fin : 0,
    tipoEdu: '',
    institucion: '',
    imageUrl: '',

  })
}

onSubmit(){
  let educacion: Educacion = this.educationForm.value;
  console.log(this.educationForm.value);
  if (this.educationForm.get('id')?.value ==''){
  this.educacionService.addEducacion(educacion).subscribe(
    (newEducacion: Educacion) => {
      this.educaciones.push(newEducacion);
    }
  );
  }else { 
    console.log(this.educationForm.value);
    this.educacionService.updateEducacion(educacion).subscribe(
      () =>{
        this.reloadData();
      }
    )
  }
}


onNewEducation(){
  this.clearForm();
}

private loadForm(educacion: Educacion){
  this.educationForm.setValue({
    id: educacion.id,
    anio_inicio : educacion.anio_inicio,
    anio_fin : educacion.anio_fin,
    tipoEdu: educacion.tipoEdu,
    institucion: educacion.institucion,
    imageUrl: educacion.imageUrl,

  })
}

onEditEducation(index : number){
  let educacion: Educacion = this.educaciones[index];
  this.loadForm(educacion);
}

onDeleteEducation(index : number){
  let educacion: Educacion = this.educaciones[index];
  if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
    this.educacionService.deleteEducacion(educacion.id).subscribe(
      () => {
        this.reloadData();
      }
    )
  }
}



}
