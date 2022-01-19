import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import {
  getPokemons,
  getPokemonsVariables,
  getPokemons_pokemons_results,
} from "../graphql";
import PokemonCard from "./PokemonCard";

const POKEMON_LIST = require("../graphql/pokemons.gql");

const CardWrapper = () => {
  const [offset, setOffset] = useState<number>(0);
  const [isNextPage, setNextPage] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<
    (getPokemons_pokemons_results | null)[] | null
  >();
  const { data, loading, error, fetchMore } = useQuery<
    getPokemons,
    getPokemonsVariables
  >(POKEMON_LIST, {
    variables: {
      limit: 10,
      offset,
    },
    onCompleted: (data) => {
      setNextPage(!!data.pokemons?.next);
    },
    fetchPolicy: "no-cache",
  });

  const handleLoadMore = () => {
    if (isNextPage) {
      fetchMore({
        variables: {
          offset: offset + 10,
        },
      });
      setOffset((prev) => prev + 10);
    }
  };

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

  if (loading && pokemonData?.length === 0) return <></>;

  if (error)
    return <div className="text-center">An error occured.</div>;

  return (
    <>
      <CardWrapperStyled className="flex flex-wrap gap-3">
        {pokemonData?.map((pokemon, idx) => (
          <PokemonCard
            key={pokemon?.id ?? idx}
            id={pokemon?.id}
            img={pokemon?.image}
            name={pokemon?.name}
          />
        ))}
        <InView
          onChange={(inView) => {
            if (inView) {
              handleLoadMore();
            }
          }}
        >
          {<></>}
        </InView>
      </CardWrapperStyled>
      {!loading && (
        <div className="flex justify-center">
          <button
            onClick={() => handleLoadMore()}
            className="hidden lg:block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

const CardWrapperStyled = styled.div``;

export default CardWrapper;
