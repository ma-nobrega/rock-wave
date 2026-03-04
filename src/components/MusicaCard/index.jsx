import { FaMusic, FaPlay, FaClock, FaCalendarAlt, FaStop } from "react-icons/fa";
import styles from "./styles.module.css";

export default function MusicaCard({
    capa,
    titulo,
    artista,
    album,
    ano,
    duracao,
    genero,
    tocando,
    onPlay,
}) {
    return (
        <article className={styles.card}>
            <div className={styles.colImagem}>
                <img src={capa} alt={album} />
            </div>

            <div className={styles.colConteudo}>
                <div className={styles.infos}>
                    <h2>{titulo}</h2>

                    <div className={styles.linhaArtista}>
                        <p>{artista}</p>

                        <span className={`${styles.badge} ${styles[genero.replace(/\s+/g, "")]}`}>
                            {genero}
                        </span>
                    </div>

                    <div className={styles.detalhes}>
                        <div>
                            <FaMusic />
                            <span>{album}</span>
                        </div>

                        <div>
                            <FaCalendarAlt />
                            <span>{ano}</span>
                        </div>

                        <div>
                            <FaClock />
                            <span>{duracao}</span>
                        </div>
                    </div>
                </div>

                <button
                    className={styles.botaoPlay}
                    type="button"
                    onClick={onPlay}
                    title={tocando ? `Parar ${titulo}` : `Tocar ${titulo}`}
                >
                    {tocando ? <FaStop /> : <FaPlay />}
                </button>
            </div>
        </article>
    );
}