/* eslint-disable @next/next/no-img-element */
import React from "react";
import CardWrapper from "../src/components/CardWrapper";
import ClientOnly from "../src/components/ClientOnly";
import Navigation from "../src/components/global/Navigation";

const MainPage = () => {
  return (
    <>
      <div className="m-4">
        <div className="-m-4 lg:m-0 h-20 bg-slate-300 flex gap-6 justify-center shadow-lg align-center rounded mb-8">
          <h1 className="text-center self-center underline">
            Pokemon List
          </h1>
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
