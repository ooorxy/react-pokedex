"use client";

import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {useEffect, useState} from "react";
import FetchListPokemons from "@/api/FetchListPokemons";
import PokemonCard from "@/components/pokemons/PokemonCard";
import {PokemonInfo, PokemonPages} from "@/types/types";
import Loading from "@/components/pokemons/Loading";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export default function ListPokemons() {
    const [list, setList] = useState<PokemonInfo[]>([]);
    const [form, setForm] = useState({
        page: 0,
        search: "",
    });

    const [pages, setPages] = useState<PokemonPages>({
        previous: null,
        next: null,
    });

    const [pagination, setPagination] = useState<number[]>([]);

    const fetchPokemons = async (url: string | null = null) => {
        try {
            setList([]);
            const response = await FetchListPokemons(form, url);

            if (form.search) {
                setForm({
                    page: 0,
                    search: "",
                });
            }

            if (!pagination.length) {
                const qtd = Math.ceil(response.count / 12);
                const pagination = Array.from({ length: qtd }, (_, index) => index + 1);
                setPagination(prev => {
                    const paginasExibidas = pagination.slice(
                        Math.max(0, (form.page - 1) - 2),
                        Math.min(qtd, (form.page - 1) + 1)
                    );
                    console.log(paginasExibidas, pagination, form.page);

                    return [];
                })

                // Calcula as páginas a serem exibidas com base na página atual

            }
            setList(response.results);
            setPages({
                previous: response.previous,
                next: response.next
            });
        } catch (e) {
            console.error(e);
            setForm({
                page: 0,
                search: "",
            });

            setPages({
                previous: null,
                next: null,
            });
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, [form.page]);

    return (
        <>
            <div className="flex justify-center space-x-2">
                <div className="flex max-w-md">
                    <Input
                        type="text"
                        name="search"
                        placeholder="Pesquisar..."
                        onChange={(event) =>
                            setForm((prev) => {
                                return {
                                    page: prev.page,
                                    search: event.target.value.toLowerCase(),
                                };
                            })
                        }
                        value={form.search}
                    />
                    <Button variant="ghost" onClick={() => fetchPokemons()}>
                        Pesquisar
                    </Button>
                </div>
            </div>

            <div className="flex justify-around md:justify-between">
                {/*<Button size="lg" variant="destructive" disabled={!pages.previous}*/}
                {/*        onClick={() => fetchPokemons(pages.previous)}>*/}
                {/*    <ArrowLeft/>*/}
                {/*</Button>*/}
                {/*<Button size="lg" variant="destructive" disabled={!pages.next}*/}
                {/*        onClick={() => fetchPokemons(pages.next)}>*/}
                {/*    <ArrowRight/>*/}
                {/*</Button>*/}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={() => fetchPokemons(pages.previous)}/>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => fetchPokemons(pages.next)}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
                {list.length ? (
                    list.map((pokemon, index) => {
                        return <PokemonCard key={index} item={pokemon}/>
                    })
                ) : (
                    <Loading height={120} width={120}/>
                )}
            </div>
        </>
    );
}
