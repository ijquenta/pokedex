import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import {TagModule} from 'primeng/tag';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  imports: [CommonModule, AccordionModule, CardModule, TagModule],
  standalone: true,
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails: any;
  loading = true;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService.getPokemonDetails(+pokemonId).subscribe((data) => {
        this.pokemonDetails = data;
        this.loading = false;
      });
    }
  }
}
