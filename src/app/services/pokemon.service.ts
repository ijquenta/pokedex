import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Pokemon {
  name: string;
  url: string;
}

interface PokeApiResponse {
  results: Pokemon[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getAllPokemon(offset: number = 0, limit: number = 20): Observable<PokeApiResponse> {
    const url = `${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<PokeApiResponse>(url);
  }

  getPokemonDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}pokemon/${id}`;
    return this.http.get<any>(url);
  }

  getPokemons(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}pokemon?limit=100&offset=0`);
  }
}
