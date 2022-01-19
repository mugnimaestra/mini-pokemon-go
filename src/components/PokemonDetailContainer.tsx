import React from "react";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {
  getPokemonDetail,
  getPokemonDetailVariables,
} from "../../src/graphql";

const POKEMON_DETAIL = require("../../src/graphql/pokemonDetail.gql");

type PokemonDetailProps = {};

const PokemonDetailContainer: React.FC<PokemonDetailProps> = () => {
  const router = useRouter();
  const pokemonName =
    typeof router?.query?.pokemonName === "string"
      ? router?.query?.pokemonName
      : (router?.query?.pokemonName ?? [])[
          (router?.query?.pokemonName?.length ?? 0) - 1
        ];
  const { data, loading, error } = useQuery<
    getPokemonDetail,
    getPokemonDetailVariables
  >(POKEMON_DETAIL, {
    variables: {
      pokemonName,
    },
    fetchPolicy: "no-cache",
  });

  const mappedTypes = data?.pokemon?.types?.map(
    (item) => item?.type?.name
  );

  const mappedMoves = data?.pokemon?.moves?.map(
    (item) => item?.move?.name
  );

  if (loading) return <></>;

  if (error || !data?.pokemon?.id)
    return <div className="text-center">An error occured.</div>;
  return (
    <>
      <PokemonDetailContainerStyled className="mt-8 flex justify-center items-center items-stretch relative">
        <div className="w-full lg:w-auto rounded overflow-hidden shadow-lg items-stretch">
          {data.pokemon.sprites?.front_default && (
            <img
              className="w-full"
              src={data.pokemon.sprites?.front_default}
              alt={pokemonName ?? ""}
            />
          )}
          {data.pokemon.sprites?.back_default && (
            <img
              className="w-full"
              src={data.pokemon.sprites?.back_default}
              alt={pokemonName ?? ""}
            />
          )}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 capitalize mb-4">
              Types of Pokemon: {mappedTypes?.join(", ")}
            </div>
            <p className="text-grey-darker text-xl">All the Moves:</p>
            <ul>
              {mappedMoves?.map((move, idx) => (
                <li className="text-grey-darker text-base" key={idx}>
                  {move}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PokemonDetailContainerStyled>
      <div className="flex justify-center">
        <button className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Catch the Pokemon
        </button>
      </div>
    </>
  );
};

const PokemonDetailContainerStyled = styled.div``;

export default PokemonDetailContainer;
