'use server';

import {Pokemon} from "@/types/types";

export default async function FetchPokemon (url: string) {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Não foi possível realizar a requisição.");

    return (await response.json()) as Pokemon;
}
