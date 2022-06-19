import { NotFound, Footer } from "@components/index";
import React from "react";

export default function CustomNotFound() {
  return (
    <>
      <main>
        <NotFound
          message="Page Not Found"
          redirectUrl="/"
          btnMsg="Go to main"
        />
      </main>
      <Footer />
    </>
  );
}
