import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Maybe } from "../types";

type PokemonCardProps = {
  id: Maybe<number>;
  img: Maybe<string>;
  name: Maybe<string>;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  img,
  name,
  id,
}) => {
  const [ownedPokemon, setOwnedPokemon] = useState<number>(0);

  useEffect(() => {
    const myPokemonList: string | null =
      window.localStorage.getItem("myPokemonList");
    if (!!myPokemonList) {
      const parsedMyPokemonList: {
        id: Maybe<number>;
        name: Maybe<string>;
        nicknames: string[];
      }[] = JSON.parse(myPokemonList);
      const filterThisPokemon = parsedMyPokemonList.filter(
        (p) => p.id === id && p.name === name
      );
      if (filterThisPokemon.length > 0) {
        setOwnedPokemon(filterThisPokemon[0].nicknames.length);
      }
    }
  }, [id, name]);

  return (
    <PokemonCardStyled className="flex justify-center items-center items-stretch relative">
      <div className="w-full lg:w-auto rounded overflow-hidden shadow-lg items-stretch">
        {img && <img className="w-full" src={img} alt={name ?? ""} />}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 capitalize">
            {name}
          </div>
          <p className="text-grey-darker text-base">
            Owned: {ownedPokemon}
          </p>
        </div>
      </div>
      {name && (
        <Link href={`/pokemon/${name}`}>
          <a className="overlay-navigation" />
        </Link>
      )}
    </PokemonCardStyled>
  );
};

const PokemonCardStyled = styled.div`
  width: 100%;

  @media screen and (min-width: 768px) {
    width: calc(50% - 12px);
  }

  @media screen and (min-width: 991px) {
    width: auto;
  }
`;

export default PokemonCard;
