/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import CardWrapper from "../src/components/CardWrapper";
import ClientOnly from "../src/components/ClientOnly";
import Navigation from "../src/components/global/Navigation";
import { Maybe } from "../src/types";

const MainPage = () => {
  const [totalOwnedPokemon, setTotalOwnedPokemon] =
    useState<number>(0);

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

      const mapToTotalPokemon = parsedMyPokemonList.map(
        (pokemon) => pokemon.nicknames.length
      );
      const totalPokemon = mapToTotalPokemon.reduce(
        (prev, curr) => prev + curr
      );
      setTotalOwnedPokemon(totalPokemon);
    }
  }, []);
  return (
    <>
      <div className="m-4">
        <div className="-m-4 py-8 lg:m-0 h-20 bg-slate-300 flex flex-col gap-6 justify-center shadow-lg align-center rounded mb-8">
          <h1 className="text-center self-center underline">
            Pokemon List
          </h1>
          <span className="total-owned text-center -mt-4">
            Total pokemon owned: {totalOwnedPokemon}
          </span>
        </div>
        <ClientOnly>
          <CardWrapper />
        </ClientOnly>
      </div>
      <Navigation />
    </>
  );
};

export default MainPage;
