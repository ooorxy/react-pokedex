import React from 'react';
import Image, {ImageProps} from "next/image";
import Pokebola from "@/imgs/pokeball.gif";

type LoadingProps = {width: number; height: number;}
export default function Loading({width = 0, height = 0}: LoadingProps) {
    return <Image
        width={width}
        height={height}
        src={Pokebola}
        alt="Carregando..."
        loading="lazy"
        unoptimized={true}
    />;
}
