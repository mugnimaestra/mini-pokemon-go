import styled from "@emotion/styled";
import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <NavigationStyled className="navigation fixed bottom-0 h-14 bg-slate-100 w-full flex justify-center align-center">
      <div className="home self-center flex flex-col text-center relative">
        <img
          src="/home.png"
          alt="Home"
          className="h-4 icn self-center"
        />
        Home
        <Link href="/">
          <a className="overlay-navigation" />
        </Link>
      </div>
      <div className="my-pokemon self-center flex flex-col text-center relative">
        <img
          src="/collections.png"
          alt="Home"
          className="h-4 icn self-center"
        />
        My Pokemon
        <Link href="/collections">
          <a className="overlay-navigation" />
        </Link>
      </div>
    </NavigationStyled>
  );
};

const NavigationStyled = styled.div`
  .icn {
    max-width: max-content;
  }

  .navigation {
    border-top: 1px solid rgb(224, 224, 224);
  }

  & div {
    flex: 1 1 50%;
  }
`;

export default Navigation;
