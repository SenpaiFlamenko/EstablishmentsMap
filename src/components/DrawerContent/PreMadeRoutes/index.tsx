import React, { useEffect } from "react";
import { readData } from "../../db";

function PreMadeRoutes() {
  const getPlaces = async () => {
    const places = await readData();
    console.log(places);
  };
  useEffect(() => {
    getPlaces();
  }, []);

  return <div>PreMadeRoutes</div>;
}

export default PreMadeRoutes;
