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
    const qtdPages = Math.ceil(1302 / 12);
    const paginationArr = Array.from({ length: qtdPages }, (_, index) => index);

    const buttonClick = (pageNumber: number, nextPage: string | null) => {
        if (pageNumber === 0) {
            return;
        }

        setForm((prev) => {
            let newPage = prev.page + pageNumber;
            if (newPage < 0) {
                newPage = 0;
            }

            return {...prev, page: newPage};
        });

        fetchPokemons(nextPage).then();
    }

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
        fetchPokemons().then();
    }, []);

    useEffect(() => {
        setPagination(paginationArr.slice(Math.max(0, (form.page - 1) - 1), Math.min(qtdPages, (form.page - 1) + 2)));
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
            <p className="pokeball"></p>

            <div className="flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={() => buttonClick(-1, pages.previous)}/>
                        </PaginationItem>
                        {
                            pagination.map((page: number) => {
                                return <PaginationItem key={page}>
                                    <PaginationLink isActive={page === form.page} href="#" onClick={() => buttonClick(page - form.page, `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=12`)}>{page}</PaginationLink>
                                </PaginationItem>;
                            })
                        }
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => buttonClick(+1, pages.next)}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <div className={`gap-4 justify-center ${list.length ? 'grid sm:grid-cols-3' : 'flex'}`}>
                {list.length ? (
                    list.map((pokemon, index) => {
                        return <PokemonCard key={index} item={pokemon} index={index}/>
                    })
                ) : (
                    <Loading height={120} width={120}/>
                )}
            </div>
        </>
    );
}
