import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

interface Pokemon {
  name: string;
  url: string;
  image: string; // Añadimos el campo de imagen
}

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, FormsModule, CardModule],
})
export class PokedexComponent implements OnInit {
  filteredPokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}

  // Este método es llamado cuando se realiza una búsqueda en el autocomplete
  searchPokemons(event: any): void {
    const query = event.query.toLowerCase(); // Filtra por minúsculas para mayor precisión
    if (query.length >= 1) { // Solo realiza la búsqueda si el query tiene al menos 3 caracteres
      this.pokemonService.getPokemons(query).subscribe((data: any) => {
        this.filteredPokemons = data.results
          .filter((pokemon: any) =>
            pokemon.name.toLowerCase().includes(query)
          )
          .map((pokemon: any) => ({
            name: pokemon.name,
            url: pokemon.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`, // Extraemos la ID y construimos la URL de la imagen
          }));
      });
    } else {
      this.filteredPokemons = [];
    }
  }
}
