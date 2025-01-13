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
import { FloatLabel } from 'primeng/floatlabel';
import {Pokemon, Types} from '../model/pokemen.model'
import { KnobModule } from 'primeng/knob';
import { AccordionModule } from 'primeng/accordion';
import { GalleriaModule } from 'primeng/galleria';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface PokemonImage {
  itemImageSrc: string;
}

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  standalone: true,
  imports: [ToastModule, GalleriaModule, AccordionModule, KnobModule, FloatLabel, CommonModule, AutoCompleteModule, FormsModule, CardModule, DataViewModule, SelectButton, Tag, Rating, ButtonModule, TagModule, ChipModule, TooltipModule, DialogModule, DropdownModule, InputTextModule],
  providers: [MessageService]
})
export class PokedexComponent implements OnInit {
  filteredPokemons: Pokemon[] = [];
  allPokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  searchText: string = '';
  layout: 'list' | 'grid' = 'grid';
  options = ['list', 'grid'];
  emptyMessage = "No Pokémon found. Please refine your search.";
  display: boolean = false;
  loading: boolean = true;
  types: string[] = ['grass', 'fire', 'water', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'steel', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'normal'];
  selectedType: Types | null = null;
  alphabeticalOptions = [
    { label: 'A-Z', value: 'asc' },
    { label: 'Z-A', value: 'desc' }
  ];
  selectedAlphabetical: string | null = null;
  selectedImageIndex = 0;
  favorites: any[] = [];
  pokemonImages = [
    { itemImageSrc: '', thumbnailImageSrc: '' }
  ];
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];
  constructor(private pokemonService: PokemonService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getAllPokemons()
  }

  getAllPokemons(): void {
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.allPokemons = data;
      this.filteredPokemons = [...data];
      console.log("allpokemons", this.allPokemons)
      this.loadFavorites();
      this.loading = false;
    });
  }

  loadFavorites(): void {
    const favorites = localStorage.getItem('favorites');
    this.favorites = favorites ? JSON.parse(favorites) : [];
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

    return gradients[type.toLowerCase()] || 'linear-gradient(135deg, #FFFFFF, #E0E0E0)';
  }

  showDialog(id: number): void {
    console.log("this.selec idd", id);
    this.pokemonService.getPokemonDetails(id).subscribe((pokemon: Pokemon) => {
      this.selectedPokemon = pokemon;
      console.log("this.selec", this.selectedPokemon);
      this.display = true;
    });
  }

  applyFilters() {
    let filtered = [...this.allPokemons];
    if (this.selectedType) {
      // filtered = filtered.filter(pokemon => pokemon.types.includes(this.selectedType));
    }
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
        const nameMatch = pokemon.name.toLowerCase().includes(this.searchText.toLowerCase());
        return nameMatch;
      });
    }

    this.filteredPokemons = filtered;
  }

  findPokemonByName(): void {
    const query = this.searchText?.trim().toLowerCase();
    if (!query) {
      this.filteredPokemons = [...this.allPokemons];
      return;
    }
    this.filteredPokemons = this.allPokemons.filter(pokemon => {
      const id = pokemon.url ? pokemon.url.split('/').filter(segment => segment).pop() : null;
      return (
        pokemon.name.toLowerCase().includes(query) ||
        id === query
      );
    });
  }

  saveFavorite(pokemon: Pokemon): void {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === pokemon.id);
    if (index === -1) {
      favorites.push(pokemon);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Pokemon added to favorites' });
    } else {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Pokemon removed from favorites' });
    }
    this.loadFavorites();
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.favorites.some(fav => fav.id === pokemon.id);
  }

  getFavorites(): Pokemon[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

}
