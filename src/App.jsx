import { useState } from "react";
import { FaMusic, FaSearch } from "react-icons/fa";
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
    if (musicaAtual && musicaAtual.id === musica.id) {
      setTocando(!tocando);
      return;
    }
    setMusicaAtual(musica);
    setTocando(true);
  }

  function quandoAcabar() {
    setTocando(false);
  }

  return (
    <div className="pagina">
      <header className="topo">
        <div className="container">
          <div className="marca">
            <FaMusic />
            <h1 className="tituloMarca">
              Rock<span>Wave</span>
            </h1>
          </div>

          <p className="subtitulo">Sua coleção de clássicos do rock</p>

          <div className="areaBusca">
            <div className="campoBusca">
              <FaSearch />
              <input
                type="text"
                placeholder="Buscar por música..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <p className="contador">{musicasFiltradas.length} músicas disponíveis</p>
          </div>
        </div>
      </header>

      <main className="conteudo">
        <div className="container">
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
        </div>
      </main>

      {/* player invisível */}
      {musicaAtual && (
        <audio
          src={musicaAtual.arquivo}
          autoPlay={tocando}
          onEnded={quandoAcabar}
          style={{ display: "none" }}
        />
      )}

      <footer className="rodape">
        <div className="container">
          <div className="rodapeTopo">
            <span className="rodapeMarca">
              Rock<span>Wave</span>
            </span>

            <span className="rodapeLinha">
              Feito para treinar React: busca, props e componentização.
            </span>
          </div>

          <div className="rodapeBaixo">
            <span>© {new Date().getFullYear()} RockWave</span>
            <span className="rodapePonto">•</span>
            <span>Projeto educacional</span>
          </div>
        </div>
      </footer>
    </div>
  );
}