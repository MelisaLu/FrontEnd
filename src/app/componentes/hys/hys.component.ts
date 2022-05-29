import { Component, OnInit } from '@angular/core';
import { Habilidades } from './habilidades';
import { HabilidadesService } from './habilidades.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  public habilidadess: Habilidades []=[];
  isUserLogged: Boolean = false;

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


}
