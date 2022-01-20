import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import {
  getPokemonDetail,
  getPokemonDetailVariables,
} from "../../src/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

const POKEMON_DETAIL = require("../../src/graphql/pokemonDetail.gql");

type PokemonDetailProps = {};

const PokemonDetailContainer: React.FC<PokemonDetailProps> = () => {
  const [thisPokemon, setPokemon] = useState<{
    id: Maybe<number>;
    name: Maybe<string>;
    nicknames: Maybe<string[]>;
    images: Maybe<string[]>;
  }>({
    id: null,
    name: null,
    nicknames: [],
    images: [],
  });
  const [parsedPokemon, setParsedPokemon] = useState<
    {
      id: Maybe<number>;
      name: Maybe<string>;
      nicknames: Maybe<string[]>;
      images: Maybe<string[]>;
    }[]
  >([]);
  const router = useRouter();
  const pokemonName =
    typeof router?.query?.pokemonName === "string"
      ? router?.query?.pokemonName
      : (router?.query?.pokemonName ?? [])[
          (router?.query?.pokemonName?.length ?? 0) - 1
        ];
  const [fetchPokemonDetail, { data, loading, error }] = useLazyQuery<
    getPokemonDetail,
    getPokemonDetailVariables
  >(POKEMON_DETAIL, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setPokemon((prev) => ({
        id: data.pokemon?.id,
        name: data.pokemon?.name,
        nicknames: prev?.nicknames,
        images: [
          data.pokemon?.sprites?.front_default ?? "",
          data.pokemon?.sprites?.back_default ?? "",
        ],
      }));
    },
  });

  const mappedTypes = data?.pokemon?.types?.map(
    (item) => item?.type?.name
  );

  const mappedMoves = data?.pokemon?.moves?.map(
    (item) => item?.move?.name
  );

  const handleCatchPokemon = useCallback(
    async (
      myPokemonListParam: Maybe<
        {
          id: Maybe<number>;
          name: Maybe<string>;
          nicknames: Maybe<string[]>;
        }[]
      >
    ) => {
      if (Math.random() * 100 > 50) {
        const { value: text } = await Swal.fire({
          input: "text",
          inputLabel: `You caught a ${thisPokemon.name}! Please name it`,
          inputPlaceholder: "Gives your pokemon nickname, eg: Rajiv",
          inputAttributes: {
            "aria-label": "Gives your pokemon nickname, eg: Rajiv",
          },
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "You need to give nickname to the pokemon!";
            }
            if (
              thisPokemon.nicknames?.some(
                (nickname) => nickname === value
              )
            ) {
              return "The nickname already used for this pokemon";
            }
            return null;
          },
        });

        if (text) {
          let newParsedPokemonList = [];
          if (
            parsedPokemon.some(
              (pokemon) => pokemon.name === thisPokemon.name
            )
          ) {
            newParsedPokemonList = parsedPokemon?.map((pokemon) => {
              if (pokemon.name === thisPokemon.name) {
                return {
                  id: pokemon.id,
                  name: pokemon.name,
                  nicknames: [...(pokemon.nicknames ?? []), text],
                  images: pokemon.images,
                };
              }
              return pokemon;
            });
          } else {
            newParsedPokemonList = [...parsedPokemon];
            newParsedPokemonList.push({
              id: thisPokemon.id,
              name: thisPokemon.name,
              nicknames: [text],
              images: thisPokemon.images,
            });
          }

          setParsedPokemon(newParsedPokemonList);
          setPokemon((prev) => ({
            ...prev,
            nicknames: [...(prev?.nicknames ?? []), text],
          }));
          window.localStorage.setItem(
            "myPokemonList",
            JSON.stringify(newParsedPokemonList)
          );

          Swal.fire({
            title: "Success",
            text: `Your pokemon name is ${text}`,
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      } else {
        Swal.fire({
          title: "Failed",
          text: "Your pokeball failed to catch the pokemon",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    },
    [parsedPokemon, thisPokemon]
  );

  useEffect(() => {
    const myPokemonList: string | null =
      window.localStorage.getItem("myPokemonList");
    if (!!myPokemonList && typeof myPokemonList !== "undefined") {
      const parsedMyPokemonList: {
        id: Maybe<number>;
        name: Maybe<string>;
        nicknames: string[];
        images: string[];
      }[] = JSON.parse(myPokemonList ?? "");
      setParsedPokemon(parsedMyPokemonList);
      const filterThisPokemon = parsedMyPokemonList.filter(
        (p) => p.name === name
      );
      if (filterThisPokemon.length > 0) {
        setPokemon((prev) => ({
          ...prev,
          nicknames: filterThisPokemon[0].nicknames,
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonDetail({
        variables: {
          pokemonName,
        },
      });
    }
  }, [pokemonName]);

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
          <div className="flex justify-center">
            <button
              onClick={() => handleCatchPokemon(parsedPokemon)}
              className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Catch the Pokemon
            </button>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 capitalize mb-4">
              Types of Pokemon: {mappedTypes?.join(", ")}
            </div>
            <p className="text-grey-darker text-xl">All the Moves:</p>
            <ul>
              {mappedMoves?.map((move, idx) => (
                <li
                  className="text-grey-darker text-base capitalize"
                  key={idx}
                >
                  {move?.split("-").join(" ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PokemonDetailContainerStyled>
    </>
  );
};

const PokemonDetailContainerStyled = styled.div`
  width: 100%;

  @media screen and (min-width: 768px) {
    width: calc(50% - 12px);
  }

  @media screen and (min-width: 991px) {
    width: auto;
  }
`;

export default PokemonDetailContainer;
