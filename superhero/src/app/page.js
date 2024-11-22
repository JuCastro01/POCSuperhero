"use client";
import { useEffect, useState } from "react";
import "./globals.css";

export default function Page() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const ACCESS_TOKEN = "4995282617154105";
    const BASE_URL = `https://superheroapi.com/api.php/${ACCESS_TOKEN}/`;

    const fetchHeroes = async () => {
      const codes = [200, 465];
      const fetchedHeroes = await Promise.all(
        codes.map(async (code) => {
          const response = await fetch(`${BASE_URL}${code}`);
          if (response.ok) {
            return response.json();
          } else {
            console.error("Erro ao buscar dados:", response.status);
            return null;
          }
        })
      );
      setHeroes(fetchedHeroes.filter((hero) => hero !== null));
    };

    fetchHeroes();
  }, []);

  return (
    <div id="heroes">
      {heroes.map((hero, index) => (
        <article key={index}>
          <img src={hero.image.url} alt={hero.name} />
          <h1>{hero.name}</h1>
          <p>
            Intelligence:{" "}
            <span
              style={{
                width: `${hero.powerstats.intelligence}%`,
                backgroundColor: "#F9B32F",
              }}
            ></span>
          </p>
          <p>
            Strength:{" "}
            <span
              style={{
                width: `${hero.powerstats.strength}%`,
                backgroundColor: "#FF7C6C",
              }}
            ></span>
          </p>
        </article>
      ))}
    </div>
  );
}
