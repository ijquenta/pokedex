import { Component, OnInit } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Pokemon } from '../model/pokemen.model';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, AutoCompleteModule, CardModule, Tag, FormsModule],
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  filteredPokemons: any[] = [];
  searchText: string = '';
  allPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.loadAllPokemons();
  }

  loadFavorites(): void {
    const favorites = localStorage.getItem('favorites');
    this.favorites = favorites ? JSON.parse(favorites) : [];
  }

  loadAllPokemons(): void {
    this.pokemonService.getPokemons().subscribe((data: Pokemon[]) => {
      this.allPokemons = data;
    });
  }

  searchPokemons(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );
  }

  addFavorite(pokemon: Pokemon): void {
    const favorites = this.getFavorites();
    if (!favorites.some(fav => fav.id === pokemon.id)) {
      favorites.push(pokemon);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.loadFavorites();
    }
  }

  getFavorites(): Pokemon[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
}
