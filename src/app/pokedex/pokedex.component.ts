import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { SelectButton } from 'primeng/selectbutton';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule} from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

interface Pokemon {
  name: string;
  url: string;
  image: string; // Añadimos el campo de imagen
  types: any;
}

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, FormsModule, CardModule, DataViewModule, SelectButton, Tag, Rating, ButtonModule, TagModule, ChipModule, TooltipModule, DialogModule, DropdownModule, InputTextModule],
})
export class PokedexComponent implements OnInit {
  filteredPokemons: Pokemon[] = [];
  allPokemons: Pokemon[] = []; // Todos los pokemones
  selectedPokemon: Pokemon | null = null;
  searchText: string = ''; // Filtro de texto
  layout: 'list' | 'grid' = 'grid';  // Solo puede ser 'list' o 'grid'
  options = ['list', 'grid'];

  display: boolean = false;

  types: string[] = ['grass', 'fire', 'water', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'steel', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'normal'];
  selectedType: string | null = null;
  alphabeticalOptions = [
    { label: 'A-Z', value: 'asc' },
    { label: 'Z-A', value: 'desc' }
  ];
  selectedAlphabetical: string | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data: any) => {
      console.log("data", data);
      this.allPokemons = data;
      this.filteredPokemons = [...data];
    });
  }

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
            types: pokemon.types // Asegúrate de que tienes los tipos disponibles
          }));
      });
    } else {
      this.filteredPokemons = [];
    }
  }

  getTypeColor(type: string): string {
    const gradients: { [key: string]: string } = {
      grass: 'linear-gradient(135deg, #7AC74C, #A7DB8D)',
      fire: 'linear-gradient(135deg, #F57D31, #F6B98D)',
      water: 'linear-gradient(135deg, #6390F0, #A1C6F8)',
      electric: 'linear-gradient(135deg, #F7D02C, #F8E985)',
      psychic: 'linear-gradient(135deg, #F95587, #FBB4D9)',
      ice: 'linear-gradient(135deg, #96D9D6, #D0F6F5)',
      dragon: 'linear-gradient(135deg, #6F35FC, #9F85F5)',
      dark: 'linear-gradient(135deg, #705746, #A59685)',
      fairy: 'linear-gradient(135deg, #D685AD, #F2C6D6)',
      steel: 'linear-gradient(135deg, #B7B7CE, #D2D2E6)',
      fighting: 'linear-gradient(135deg, #C22E28, #E47A73)',
      flying: 'linear-gradient(135deg, #A98FF3, #C9BDF6)',
      poison: 'linear-gradient(135deg, #A33EA1, #C68BC6)',
      ground: 'linear-gradient(135deg, #E2BF65, #F1D59A)',
      rock: 'linear-gradient(135deg, #B6A136, #D6C875)',
      bug: 'linear-gradient(135deg, #A6B91A, #C8D788)',
      ghost: 'linear-gradient(135deg, #735797, #A98EBA)',
      normal: 'linear-gradient(135deg, #A8A77A, #C8C6A6)',
    };

    return gradients[type.toLowerCase()] || 'linear-gradient(135deg, #FFFFFF, #E0E0E0)'; // Degradado por defecto
  }

  showDialog(id: number): void {
    console.log("this.selec idd", id);
    this.pokemonService.getPokemonDetails(id).subscribe((pokemon) => {
      this.selectedPokemon = pokemon;
      console.log("this.selec", this.selectedPokemon);
      this.display = true;
    });
  }

  // Aplicar los filtros
  applyFilters() {
    let filtered = [...this.allPokemons];

    // Filtro por tipo
    if (this.selectedType) {
      filtered = filtered.filter(pokemon => pokemon.types.includes(this.selectedType));
    }

    // Filtro alfabético
    if (this.selectedAlphabetical) {
      filtered = filtered.sort((a, b) => {
        if (this.selectedAlphabetical === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    if (this.searchText) {
      filtered = filtered.filter(pokemon => {
        // Busca por nombre
        const nameMatch = pokemon.name.toLowerCase().includes(this.searchText.toLowerCase());

        // Busca por ID (número)
        const idMatch = pokemon.url.includes(this.searchText);

        return nameMatch || idMatch;
      });
    }

    this.filteredPokemons = filtered;
  }
}
