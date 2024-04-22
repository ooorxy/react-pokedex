"use server";

import { ListPokemon, Pokemon } from "@/types/types";
import next from "next";

type FetchData = {
  search?: string | null;
  page?: number | null;
};

export default async function FetchListPokemons(data: FetchData, url: string | null) {
  let additionalUrl = `?offset=${data.page}&limit=12`;

  if (data.search) {
    additionalUrl = `${data.search}`;
  }

  const urlFetch = `https://pokeapi.co/api/v2/pokemon/${additionalUrl}`;
  console.log(urlFetch);
  const response = await fetch(url ?? urlFetch, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Não foi possível realizar a requisição.");

  const json = (await response.json()) as ListPokemon | Pokemon;

  if ("results" in json) {
    return json;
  }

  return {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        name: json.name,
        url: urlFetch,
      },
    ],
  };
}
