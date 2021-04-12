import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes : HeroeModel[] = [];
    cargando = false; 

    constructor( private heroesService : HeroesService ) { }

    ngOnInit(): void {
        this.cargando = true ;
        this.heroesService.getHeroes().subscribe( data => {
            this.heroes     = data;
            this.cargando   = false;
        });
    }

    deleteHeroe( heroe : HeroeModel , index : number ) {

        Swal.fire({
            title: 'Eliminar registro',
            text: `Decea eliminar ${ heroe.nombre }`,
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        }).then( resp => {
                if( resp.value ){
                    this.heroesService.deleteHeroe( heroe.id ).subscribe();
                    this.heroes.splice( index, 1);
                }
        });
    }

}
