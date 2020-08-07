import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaActual] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(1);
  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return;
      const immagenesPorPagina = 30;
      const key = '17775610-df5989ff5546d12e68d9a5435';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${immagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);
      //calcular el total de paginas
      const calcularTotalPaginas =Math.ceil(resultado.totalHits / immagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);
      
    }
    consultarApi();

    //mover la pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth' });

  }, [busqueda, paginaactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if(nuevaPaginaActual === 0 ) return;
    setPaginaActual(nuevaPaginaActual);
  }
  
  const paginaSueguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpaginas ) return;
    setPaginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscardor de Imágenes</p>
        <Formulario setBusqueda={setBusqueda} />
        
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}/>
        {(paginaactual === 1)?null:
          <button
            type= "button"
            className="bbtn btn-info"
            onClick={paginaAnterior}
          >&laquo; Anterior </button>
        }
        {(paginaactual === totalpaginas)?null:
          <button
            type= "button"
            className="bbtn btn-info"
            onClick={paginaSueguiente}
          >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;
