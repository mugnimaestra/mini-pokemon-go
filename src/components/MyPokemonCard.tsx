import styled from "@emotion/styled";
import React from "react";
import Swal from "sweetalert2";
import { Maybe } from "../types";

type MyPokemonCardProps = {
  pokemonId: Maybe<number>;
  name: Maybe<string>;
  nicknames: Maybe<string[]>;
  images: Maybe<string[]>;
};

const MyPokemonCard: React.FC<MyPokemonCardProps> = ({
  pokemonId,
  name,
  nicknames,
  images,
}) => {
  const handleRemovePokemon = (nicknameParam: Maybe<string>) => {
    Swal.fire({
      title: `Do you want release the pokemon named ${nicknameParam}?`,
      showCancelButton: true,
      confirmButtonText: "Release",
      cancelButtonText: `Noo I changed my mind `,
    }).then((result) => {
      if (result.isConfirmed) {
        const myPokemonList: string | null =
          window.localStorage.getItem("myPokemonList");
        if (typeof myPokemonList === "string") {
          const parsedMyPokemonList: MyPokemonCardProps[] =
            JSON.parse(myPokemonList);
          //   const newParsedMyPokemonList = parsedMyPokemonList.map(pokemon => {
          //     const newNicknames = [...(pokemon?.nicknames ?? [])];
          //     return pokemon;
          //   })
        }
        Swal.fire(
          `You release ${nicknameParam} to the wild`,
          "",
          "success"
        );
      }
    });
  };

  return (
    <MyPokemonCardStyled className="mt-8 flex justify-center items-center items-stretch relative mb-10">
      <div className="border-zinc-500 border-4 p-2 w-full lg:w-auto rounded overflow-hidden shadow-lg items-stretch">
        <h1 className="text-2xl text-center capitalize">{name}</h1>
        {(images?.length ?? []) > 0 &&
          images?.map((img) => (
            <img className="w-full" src={img} alt={name ?? ""} />
          ))}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-8">
            List of your owned nickname pokemon:
          </div>
          {nicknames?.map((nickname) => (
            <li className="text-lg flex justify-between align-center mb-6">
              <span className="self-center">{nickname}</span>
              <button
                onClick={() => handleRemovePokemon(nickname)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
              >
                Remove
              </button>
            </li>
          ))}
        </div>
      </div>
    </MyPokemonCardStyled>
  );
};

const MyPokemonCardStyled = styled.div`
  width: 100%;

  @media screen and (min-width: 768px) {
    width: calc(50% - 12px);
  }

  @media screen and (min-width: 991px) {
    width: auto;
  }
`;

export default MyPokemonCard;
