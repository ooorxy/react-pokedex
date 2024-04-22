// Interfaces que não serão exportadas.
interface Types {
    "slot": number,
    "type": {
        "name": string,
        "url": string,
    }
}

interface Sprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            "front_default": string;
        };
        "official-artwork": {
            "front_default": string;
            "front_shiny": string;
        };
    },
}

// Interfaces que serão exportadas.
export interface PokemonPages {
    previous: string | null,
    next: string | null,
}

export interface ListPokemon {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonInfo[];
}

export interface PokemonInfo {
    name: string;
    url: string;
}

export interface Pokemon {
    name: string;
    order: number;
    sprites: Sprites,
    types: Types[],
}
