import { useState } from 'react'
import axios from 'axios'


function App() {
  const [generoSelecionado, setGeneroSelecionado] = useState(null)
  const [generosAnime, setGenerosAnime] = useState([])
  const [generosManga, setGenerosManga] = useState([])
  const [animes, setAnimes] = useState([])
  const [mangas, setMangas] = useState([])


  if(generosAnime.length == 0 ){
    axios.get("https://api.jikan.moe/v4/genres/anime")
    .then((res) => {
      setGenerosAnime(res.data.data)
    }),[]
  }

  if(generosManga.length == 0 ){
    axios.get("https://api.jikan.moe/v4/genres/manga")
    .then((res) =>{
      setGenerosManga(res.data.data)
    }),[]
  }

  function mudaGenero(generoId) {
    const generoFiltradoAnime = generosAnime.filter((genero) => genero.mal_id === generoId);
    const generoFiltradoManga = generosManga.filter((genero) => genero.mal_id === generoId);

    if (!generoFiltradoAnime && !generoFiltradoManga) {
      setGeneroSelecionado(null);
    } else {
      setGeneroSelecionado(generoFiltradoAnime || generoFiltradoManga);
      axios.get(`https://api.jikan.moe/v4/anime?genres=${generoId}`)
        .then((res) => {
          setAnimes(res.data.data);
        });
      axios.get(`https://api.jikan.moe/v4/manga?genres=${generoId}`)
        .then((res) => {
          setMangas(res.data.data);
        });
    }
  }

  function voltar(){
    setGeneroSelecionado(null)
    setAnimes([])
    setMangas([])
  }

  return (
    <div className='.bg-secondary-subtle'>
      {!generoSelecionado && (
        <ul>
          {generosAnime.map(generoAn => (
            <li className="list-group-item active" aria-current="true" key={generoAn.mal_id} onClick={() => mudaGenero(generoAn.mal_id)}>
              {generoAn.name}
            </li>
          ))}
        </ul>
      )}

      {generoSelecionado && (
        <>
          <h2>
            {generoSelecionado.name}
            <span className="sticky-sm-top" onClick={voltar}>Voltar</span>
          </h2>
          <div>
            <p><strong>Animes:</strong></p>
            <ul>
              {animes.map(anime => (
                <li key={anime.mal_id}>
                  <a href={`https://myanimelist.net/anime/${anime.mal_id}`} target="_blank" >{anime.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p><strong>Mangás:</strong></p>
            <ul>
              {mangas.map(manga => (
                <li key={manga.mal_id}>
                  <a href={`https://myanimelist.net/manga/${manga.mal_id}`} target="_blank" >{manga.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;