import { Component, OnInit } from '@angular/core';
import { ExpLaboral } from './explaboral';
import { ExpLaboralService } from './explaboral.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-explaboral',
  templateUrl: './explaboral.component.html',
  styleUrls: ['./explaboral.component.css']
})
export class ExplaboralComponent implements OnInit {
  public explaborales: ExpLaboral[] = [];

  constructor(private expLaboralService: ExpLaboralService) {}

  ngOnInit() {
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



}
