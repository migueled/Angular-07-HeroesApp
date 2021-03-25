import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styleUrls: ['./heroe.component.css']
})

export class HeroeComponent implements OnInit {
    heroe : HeroeModel = new HeroeModel();

    constructor( private heroesService: HeroesService,
                 private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if ( id !== 'nuevo') { 
            this.heroesService.getHero( id ).subscribe(
                (respuesta : HeroeModel ) => {
                    this.heroe = respuesta;
                    this.heroe.id = id;
                }
        );
    }
    }

    save( formulario: NgForm ){
        if( formulario.invalid ){
            console.log('invalido');
            return ;
        }
        
        Swal.fire({
            title: 'Oops...',
            text: 'Something went wrong!',
            icon: 'info',
            allowOutsideClick: false
        });
        
        let peticion : Observable< any >;

        Swal.showLoading();

        if( this.heroe.id ){
            peticion = this.heroesService.actualizarHeroe( this.heroe );
        }else{
            peticion = this.heroesService.crearHeroe( this.heroe );
        }

        peticion.subscribe( respuesta => {
            Swal.fire({
                title: this.heroe.nombre,
                text: 'Se actualizo correctamente',
                icon: 'success'
            });
        });
    }

}
