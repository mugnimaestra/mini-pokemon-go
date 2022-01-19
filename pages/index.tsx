/* eslint-disable @next/next/no-img-element */
import React from "react";
import CardWrapper from "../src/components/CardWrapper";
import ClientOnly from "../src/components/ClientOnly";

const MainPage = () => {
  return (
    <div className="m-4">
      <h1 className="text-center">Pokemon List</h1>
      <ClientOnly>
        <CardWrapper />
      </ClientOnly>
    </div>
  );
};

export default MainPage;
