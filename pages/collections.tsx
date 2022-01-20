import React from "react";
import ClientOnly from "../src/components/ClientOnly";
import Navigation from "../src/components/global/Navigation";
import MyPokemonContainer from "../src/components/MyPokemonContainer";

const MyPokemon: React.FC = () => {
  return (
    <>
      <div className="m-4">
        <div className="-m-4 lg:m-0 h-20 bg-slate-300 flex gap-6 justify-center shadow-lg align-center rounded mb-8">
          <h1 className="text-center self-center underline">
            My Pokemon
          </h1>
        </div>
        <ClientOnly>
          <MyPokemonContainer />
        </ClientOnly>
      </div>
      <Navigation />
    </>
  );
};

export default MyPokemon;
