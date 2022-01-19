import { useRouter } from "next/router";
import React from "react";
import ClientOnly from "../../src/components/ClientOnly";
import PokemonDetailContainer from "../../src/components/PokemonDetailContainer";

const PokemonDetail = () => {
  const router = useRouter();
  return (
    <div className="m-4">
      <h1 className="text-center capitalize">
        Pokemon Detail {router.query.pokemonName}
      </h1>
      <ClientOnly>
        <PokemonDetailContainer />
      </ClientOnly>
    </div>
  );
};

export default PokemonDetail;
