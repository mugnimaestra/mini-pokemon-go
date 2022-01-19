/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPokemonDetail
// ====================================================

export interface getPokemonDetail_pokemon_sprites {
  __typename: "Sprite";
  back_default: string | null;
  front_default: string | null;
}

export interface getPokemonDetail_pokemon_types_type {
  __typename: "BaseName";
  id: number | null;
  url: string | null;
  name: string | null;
}

export interface getPokemonDetail_pokemon_types {
  __typename: "Type";
  slot: number | null;
  type: getPokemonDetail_pokemon_types_type | null;
}

export interface getPokemonDetail_pokemon_moves_move {
  __typename: "BaseName";
  id: number | null;
  url: string | null;
  name: string | null;
}

export interface getPokemonDetail_pokemon_moves {
  __typename: "Move";
  move: getPokemonDetail_pokemon_moves_move | null;
}

export interface getPokemonDetail_pokemon {
  __typename: "Pokemon";
  id: number | null;
  sprites: getPokemonDetail_pokemon_sprites | null;
  types: (getPokemonDetail_pokemon_types | null)[] | null;
  moves: (getPokemonDetail_pokemon_moves | null)[] | null;
}

export interface getPokemonDetail {
  pokemon: getPokemonDetail_pokemon | null;
}

export interface getPokemonDetailVariables {
  pokemonName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPokemons
// ====================================================

export interface getPokemons_pokemons_results {
  __typename: "PokemonItem";
  id: number | null;
  url: string | null;
  name: string | null;
  image: string | null;
}

export interface getPokemons_pokemons {
  __typename: "PokemonList";
  next: string | null;
  status: boolean | null;
  results: (getPokemons_pokemons_results | null)[] | null;
}

export interface getPokemons {
  pokemons: getPokemons_pokemons | null;
}

export interface getPokemonsVariables {
  limit?: number | null;
  offset?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
