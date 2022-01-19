import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {
  getPokemons,
  getPokemonsVariables,
  getPokemons_pokemons_results,
} from "../graphql";
import PokemonCard from "./PokemonCard";

const POKEMON_LIST = require("../graphql/pokemons.gql");

const CardWrapper = () => {
  const [offset, setOffset] = useState<number>(0);
  const [pokemonData, setPokemonData] = useState<
    (getPokemons_pokemons_results | null)[] | null
  >();
  const { data, loading, error } = useQuery<
    getPokemons,
    getPokemonsVariables
  >(POKEMON_LIST, {
    variables: {
      limit: 10,
      offset,
    },
  });

  useEffect(() => {
    let newData = [
      ...(pokemonData ?? []),
      ...(data?.pokemons?.results ?? []),
    ];
    newData = newData.filter(
      (data, idx, self) =>
        idx === self.findIndex((p) => p?.id === data?.id)
    );

    setPokemonData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <></>;

  if (error)
    return <div className="text-center">An error occured.</div>;

  return (
    <CardWrapperStyled className="flex flex-wrap gap-3">
      {pokemonData?.map((pokemon) => (
        <PokemonCard
          id={pokemon?.id}
          img={pokemon?.image}
          name={pokemon?.name}
        />
      ))}
    </CardWrapperStyled>
  );
};

const CardWrapperStyled = styled.div``;

export default CardWrapper;
