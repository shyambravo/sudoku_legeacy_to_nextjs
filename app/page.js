import React from "react";
import "./sudoku.css";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("./app.js"), {
  ssr: false,
});

const Home = () => {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
};

export default Home;
