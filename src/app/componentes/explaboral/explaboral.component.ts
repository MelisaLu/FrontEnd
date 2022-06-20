import { Component, OnInit } from '@angular/core';
import { ExpLaboral } from './explaboral';
import { ExpLaboralService } from './explaboral.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-explaboral',
  templateUrl: './explaboral.component.html',
  styleUrls: ['./explaboral.component.css']
})
export class ExplaboralComponent implements OnInit {
  public explaborales: ExpLaboral[] = [];
  isUserLogged: Boolean = false;
  public editExpLaboral: ExpLaboral;
  public deleteExpLaboral: ExpLaboral;

  constructor(private expLaboralService: ExpLaboralService,
    private authService: AuthService) {}

  ngOnInit(): any {
    this.isUserLogged = this.authService.isUserLogged();
    this.getExpLaboral();
  }

  public getExpLaboral():void{
    this.expLaboralService.getExpLaboral().subscribe(
      (response: ExpLaboral[])=>{
        this.explaborales = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onOpenModal(explaboral: ExpLaboral, mode: string): void {
    const container = document.getElementById('explaboralcontainer')
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addExpLaboralModal');
    }
    if (mode === 'edit'){
      this.editExpLaboral = explaboral;
      button.setAttribute('data-target', '#updateExpLaboralModal');
    }
    if (mode === 'delete'){
      this.deleteExpLaboral = explaboral;
      button.setAttribute('data-target', '#deleteExpLaboralModal');
    }
    container.appendChild(button);
    button.click();
  
  }

  public onAddExpLaboral(addForm: NgForm): void{
    document.getElementById('add-explaboral-form').click();
    this.expLaboralService.addExpLaboral(addForm.value).subscribe(
      (response: ExpLaboral) => {
        console.log(response);
        this.getExpLaboral();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateExpLaboral(explaboral: ExpLaboral): void{

    this.expLaboralService.updateExpLaboral(explaboral).subscribe(
      (response: ExpLaboral) =>{
        console.log(response);
        this.getExpLaboral();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );

  }

  
  public onDeleteExpLaboral(expLaboralId: number):void{
    this.expLaboralService.deleteExpLaboral(expLaboralId).subscribe(
      (response: void) =>{
        console.log(response);
        this.getExpLaboral();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

}
