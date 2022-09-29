import { useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import axios from "axios";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import './styles/main.css';
import logoImg from './assets/Logo.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [options, setOptions] = useState({});
  const [games, setGames] = useState<Game[]>([]);
  const [ref] = useKeenSlider<HTMLDivElement>(options);

  useEffect(() => {
    const getGames = async () => {
      const response = await axios('http://localhost:3333/games');
      setGames(response.data);
      setTimeout(() => {
        setOptions({
          loop: true,
          mode: 'free-snap',
          slides: {
            perView: 6,
            spacing: 15,
          },
          breakpoints: {
            '(max-width: 1024px)': {
              slides: {
                perView: 3,
                spacing: 15,
              },
            },
            '(max-width: 640px)': {
              slides: {
                perView: 2,
                spacing: 15,
              },
            },},
          });
        }, 10);
      };
      getGames();
    }, []);

  return (
    <div className="max-w-[1380px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" width={350}  height={350}/>

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="keen-slider mt-20 flex" ref={ref}>
          {games.map(game => {
            return (
              <GameBanner
                key={game.id}
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
              />
            )
          })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App