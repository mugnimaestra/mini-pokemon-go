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
  count: number | null;
  next: string | null;
  previous: string | null;
  status: boolean | null;
  message: string | null;
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
