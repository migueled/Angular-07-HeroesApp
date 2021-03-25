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
    constructor( private heroesService: HeroesService ) { }

    ngOnInit(): void {
        this.heroesService.getHeroes().subscribe( data => this.heroes = data);
    }

    deleteHeroe( heroe: HeroeModel , index:number ) {

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
