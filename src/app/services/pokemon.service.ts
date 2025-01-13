import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../model/pokemen.model';

interface PokeApiResponse {
  results: Pokemon[];
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  sprites: {
    front_default: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemons(offset: number = 0, limit: number = 500): Observable<Pokemon[]> {
    const url = `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`;

    return this.http.get<any>(url)
      .pipe(
        map((response: any) => response.results),
        map((pokemons: any[]) => pokemons.map((pokemon: any) => this.getPokemonDetail(pokemon.url))),
        switchMap((detailRequests: Observable<Pokemon>[]) => forkJoin(detailRequests))
      );
  }

  getPokemonDetail(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const types = response.types.map((typeInfo: any) => typeInfo.type.name);
        const heightInMeters = (response.height / 10).toFixed(1);

        return {
          id: response.id,
          name: response.name,
          types: types,
          height: `${heightInMeters}m`,
          weight: response.weight + 'kg',
          image: response.sprites.other.showdown.front_default
        };
      })
    );
  }

  getPokemonDetails(id: number): Observable<Pokemon> {
    const url = `${this.baseUrl}pokemon/${id}`;
    return this.http.get<Pokemon>(url);
  }

}
