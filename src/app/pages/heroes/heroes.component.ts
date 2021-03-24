import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

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

}
