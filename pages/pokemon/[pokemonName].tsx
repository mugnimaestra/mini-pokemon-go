import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import ClientOnly from "../../src/components/ClientOnly";
import PokemonDetailContainer from "../../src/components/PokemonDetailContainer";
import Navigation from "../../src/components/global/Navigation";

const PokemonDetail = () => {
  const router = useRouter();
  return (
    <>
      <div className="m-4">
        <div className="-m-4 lg:m-0 h-20 bg-slate-300 flex gap-6 justify-center shadow-lg align-center rounded">
          <div className="relative self-center">
            <img
              src="/back-arrow.png"
              alt="Go back"
              className="h-6"
            />
            <Link href="/">
              <a className="overlay-navigation" />
            </Link>
          </div>

          <h1 className="text-center text-xl lg:text-2xl self-center capitalize">
            Pokemon Detail {router.query.pokemonName}
          </h1>
        </div>
        <ClientOnly>
          <PokemonDetailContainer />
        </ClientOnly>
      </div>
      <Navigation />
    </>
  );
};

export default PokemonDetail;
