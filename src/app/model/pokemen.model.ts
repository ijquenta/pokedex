export interface Pokemon {
  id: number;                      // ID del Pokémon
  name: string;                    // Nombre del Pokémon
  order: number;                   // Orden en el que aparece en la Pokédex
  base_experience: number;         // Experiencia base
  url: string;
  height: number;                  // Altura
  weight: number;                  // Peso
  types: Types[];                   // Tipos del Pokémon (Array de objetos)
  stats: Stats[];                   // Estadísticas del Pokémon (Array de objetos)
  abilities: Abilities[];            // Habilidades del Pokémon (Array de objetos)
  cries: Cries;                    // Enlaces a los archivos de gritos
  sprites: Sprites;                // Imágenes del Pokémon
  moves: Move[];                   // Movimientos que puede aprender

}

export interface Other {
  showdown: Showdown;                    // Nombre del tipo (ej. fire, water, etc.)
}

export interface Showdown {
  front_default: string;            // URL de la imagen del frente del Pokémon
  back_default: string;             // URL de la imagen trasera del Pokémon
  front_shiny: string;              // URL de la imagen del frente del Pokémon en versión shiny
  back_shiny: string;               // URL de la imagen trasera del Pokémon en versión shiny
}


export interface Types {
  slot: number;                    // Nombre del tipo (ej. fire, water, etc.)
  type: Type;
}

export interface Type {
  name: string;                    // Nombre del tipo (ej. fire, water, etc.)
  url: string;
}

export interface Stats {
  base_stat: number;                    // Nombre de la estadística (ej. hp, attack, defense, etc.)
  effort: number;
  stat: Stat
}

export interface Stat {
  name: string;                    // Nombre de la estadística (ej. hp, attack, defense, etc.)
  url: string;
}

export interface Abilities {
  is_hidden: boolean;                    // Nombre de la habilidad
  slot: number;
  ability: Ability;
}

export interface Ability {
  name: string;                    // Nombre de la habilidad
  url: string;                     // URL de la habilidad en la API
}

export interface Cries {
  latest: string;                  // URL del grito más reciente
  legacy: string;                  // URL del grito anterior
}

export interface Sprites {
  front_default: string;            // URL de la imagen del frente del Pokémon
  back_default: string;             // URL de la imagen trasera del Pokémon
  front_shiny: string;              // URL de la imagen del frente del Pokémon en versión shiny
  back_shiny: string;               // URL de la imagen trasera del Pokémon en versión shiny
  front_female: string;            // URL de la imagen del frente femenino del Pokémon
  back_female: string;             // URL de la imagen trasera femenina del Pokémon
  front_shiny_female: string;      // URL de la imagen del frente shiny femenino
  back_shiny_female: string;       // URL de la imagen trasera shiny femenina
  other: Other;
}

export interface Move {
  name: string;                    // Nombre del movimiento
  url: string;                     // URL del movimiento en la API
}
