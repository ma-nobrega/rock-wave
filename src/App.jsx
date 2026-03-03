import { useState } from "react";
import "./styles/App.css";
import musicas from "./data/musicas.json";
import MusicaCard from "./components/MusicaCard";

export default function App() {
  const [busca, setBusca] = useState("");
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [tocando, setTocando] = useState(false);

  const musicasFiltradas = musicas.filter((m) =>
    m.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  function tocarOuPausar(musica) {
    // clicou na mesma música -> alterna play/pause
    if (musicaAtual && musicaAtual.id === musica.id) {
      setTocando(!tocando);
      return;
    }

    // clicou em outra música -> troca e toca
    setMusicaAtual(musica);
    setTocando(true);
  }

  function quandoAcabar() {
    setTocando(false);
  }

  return (
    <div className="pagina">
      <header className="topo">
        <h1 className="tituloPrincipal">RockWave</h1>

        <input
          className="inputBusca"
          type="text"
          placeholder="Buscar por música..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <p className="contador">{musicasFiltradas.length} músicas disponíveis</p>
      </header>

      <main className="conteudo">
        <section className="lista">
          {musicasFiltradas.map((musica) => (
            <MusicaCard
              key={musica.id}
              capa={musica.capa}
              titulo={musica.titulo}
              artista={musica.artista}
              album={musica.album}
              ano={musica.ano}
              duracao={musica.duracao}
              genero={musica.genero}
              tocando={musicaAtual?.id === musica.id && tocando}
              onPlay={() => tocarOuPausar(musica)}
            />
          ))}

          {musicasFiltradas.length === 0 && (
            <div className="vazio">
              <h3>Nenhuma música encontrada</h3>
              <p>Tenta buscar por outro título.</p>
            </div>
          )}
        </section>
      </main>

      {/* PLAYER ÚNICO (global) */}
      {musicaAtual && (
        <footer className="player">
          <div className="playerInfo">
            <strong>{musicaAtual.titulo}</strong>
            <span>{musicaAtual.artista}</span>
          </div>

          <audio
            className="playerAudio"
            src={musicaAtual.arquivo}
            controls
            autoPlay={tocando}
            onEnded={quandoAcabar}
          />
        </footer>
      )}
    </div>
  );
}