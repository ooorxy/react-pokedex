'use client';
import React, {useEffect, useState} from "react";
import {Pokemon, PokemonInfo} from "@/types/types";
import FetchPokemon from "@/api/FetchPokemon";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Loading from "@/components/pokemons/Loading";
import Image from "next/image";

export default function PokemonCard({item, index}: { item: PokemonInfo, index: number }) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const fetchPokemon = async () => {
        const response = await FetchPokemon(item.url);

        setPokemon(response);
    }

    const stringToUppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        setTimeout(() => {
            fetchPokemon();
        }, 500 * index);
    }, []);

    return <div className="flex justify-center">
        <Card className={`card-pokemon text-gray-500 ${pokemon ? `${pokemon.types[0].type.name}-bg` : 'flex justify-center items-center'}`}>
            {!pokemon ? <Loading width={120} height={120}/> :
                <>
                    <CardHeader className="text-center text-[1.325rem]">
                        <span className="badge">{stringToUppercase(pokemon.name)}</span>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Image src={pokemon.sprites.other["official-artwork"].front_default}
                               height={120}
                               width={120}
                               alt={pokemon.name}
                               className="img-shadow"/>
                    </CardContent>
                    <CardFooter className="flex flex-row justify-around">
                        {pokemon.types.map((type, i) =>
                            <span key={i + pokemon.order + type.type.name} className={`badge ${type.type.name}-bg`}>
                                {stringToUppercase(type.type.name)}
                            </span>
                        )}
                    </CardFooter>
                </>
            }
        </Card>
    </div>
}
