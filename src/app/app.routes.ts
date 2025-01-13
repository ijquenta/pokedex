import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pokedex/pokedex.component').then((m) => m.PokedexComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./pokemon-details/pokemon-details.component').then(
        (m) => m.PokemonDetailsComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
