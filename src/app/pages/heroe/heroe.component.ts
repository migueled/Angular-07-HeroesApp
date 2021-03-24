import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styleUrls: ['./heroe.component.css']
})

export class HeroeComponent implements OnInit {
    heroe : HeroeModel = new HeroeModel();

    constructor( private heroesService: HeroesService ) { }

    ngOnInit(): void {
    }

    save( formulario: NgForm ){
        if( formulario.invalid ){
            console.log('invalido');
            return ;
        }

        if( this.heroe.id ){
            this.heroesService.actualizarHeroe( this.heroe ).
                subscribe(
                    respuesta => console.log(respuesta)
                );
        }else{
            this.heroesService.crearHeroe( this.heroe ).
                subscribe(
                    respuesta => console.log(respuesta)
                );
        }
    }

}
