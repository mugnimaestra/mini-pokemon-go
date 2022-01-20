import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import MyPokemonCard from "./MyPokemonCard";
import { Maybe } from "../types";

const MyPokemonContainer: React.FC = () => {
  const [parsedPokemon, setParsedPokemon] = useState<
    {
      id: Maybe<number>;
      name: Maybe<string>;
      nicknames: Maybe<string[]>;
      images: Maybe<string[]>;
    }[]
  >([]);

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
    }
  }, []);

  return (
    <MyPokemonContainerStyled className="flex flex-wrap gap-3 relative">
      {parsedPokemon.map((pokemon) => (
        <MyPokemonCard
          key={pokemon.id}
          pokemonId={pokemon.id}
          name={pokemon.name}
          nicknames={pokemon.nicknames}
          images={pokemon.images}
          setParsedPokemon={(e) => setParsedPokemon(e)}
        />
      ))}
    </MyPokemonContainerStyled>
  );
};

const MyPokemonContainerStyled = styled.div``;

export default MyPokemonContainer;
