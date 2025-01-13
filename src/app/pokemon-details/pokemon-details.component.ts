import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Para acceder al ID desde la ruta
import { PokemonService } from '../services/pokemon.service';  // Importamos el servicio de Pokémon
import { CommonModule } from '@angular/common';  // Importamos CommonModule

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  imports: [CommonModule],  // Asegúrate de agregar CommonModule aquí
  standalone: true,  // Si estás usando un componente standalone
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails: any;  // Variable para almacenar los detalles del Pokémon
  loading = true;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute  // Inyectamos ActivatedRoute para obtener el ID de la URL
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
