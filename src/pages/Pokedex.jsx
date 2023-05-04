import React, { useRef, useState } from 'react'
import Header from '../assets/components/pokedex/Header'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import PokemonCard from '../assets/components/pokedex/PokemonCard'

const textType = {
    grass: 'text-[#bad6aa]',
    fire: 'text-[#fd7d24]',
    water: 'text-[#4592c4]',
    bug: 'text-[#729f3f]',
    normal: 'text-[#a4acaf]',
    poison: 'text-[#b97fc9]',
    electric: 'text-[#eed535]',
    ground: 'text-[#ab9842]',
    fairy: 'text-[#fdb9e9]',
    fighting: 'text-[#d56723]',
    psychic: 'text-[#f366b9]',
    rock: 'text-[#a38c21]',
    ghost: 'text-[#7b62a3]',
    ice: 'text-[#51c4e7]',
    dragon: 'text-[#f16e57]',
    dark: 'text-[#707070]',
    steel: 'text-[#9eb7b8]',
    flying: 'text-[#3dc7ef]',
  }


const Pokedex = () => {

    //? Array de todos los pokemons antes de filtrar
    const [pokemons, setPokemons] = useState([])

    //? String del nombre del pokemon que se busca
    const [pokemonName, setPokemonName] = useState("")

    //? Array de tipos de pokemon
    const [types, setTypes] = useState([])

    //? String del tipo de pokemon actual, cambia de acuerdo al select
    const [currentType, setCurrentType] = useState("")

    //? Pagina actual
    const [currentPage, setCurrentPage] = useState(1)

    //? estado global donde se almacena el nombre del ususaio
    const nameTrainer = useSelector(store => store.nameTrainer)

    const input = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

    //? Paginacion y Logica
    const paginationLogic = () => {
        //Cantidad de pokemons por pagina
        const pokemonsPerPage = 20

       //Pokemons que se van a mostrar en la pagina actual
        const sliceStart = (currentPage - 1) * pokemonsPerPage
        const sliceEnd = sliceStart + pokemonsPerPage
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd) || 1

        //Ultima pagina
        const lastPage = Math.ceil(pokemonsByName.length / pokemonsPerPage)

        //Bloque actual de paginas
        const blockPages = 5
        const actualBlock = Math.ceil(currentPage / blockPages)

        //paginas que se van a mostrar en el bloque actual
        const pagesInBlock = []
        const minPage = (actualBlock - 1) * blockPages + 1
        const maxPage = actualBlock * blockPages
        for(let i = minPage; i <= maxPage; i++) {
            if(i <= lastPage) {
                pagesInBlock.push(i)
            }
        }
        return { pokemonInPage, lastPage, pagesInBlock }
    }

    const {lastPage,pagesInBlock,pokemonInPage} = paginationLogic()

    const handlePreviousPage = () => {
        const newCurrentPage = currentPage - 1
        if(newCurrentPage > 1) {
            setCurrentPage(newCurrentPage)
        }
    }

    const handleNextPage = () => {
        const newCurrentPage = currentPage + 1
        if(newCurrentPage <= lastPage) {
            setCurrentPage(newCurrentPage)
        }
    }

  useEffect(() => {
   if (!currentType){
    
    const URL = " https://pokeapi.co/api/v2/pokemon?limit=1281"

    axios.get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err))
   }
  },[currentType])


  useEffect(() => {
    const URL = ' https://pokeapi.co/api/v2/type'

    axios.get(URL)
        .then((res) => {
            const newTypes = res.data.results.map(type => type.name)
            setTypes(newTypes)
        } )
        .catch((err) => console.log(err))
  },[])

  useEffect(() => {
    if(currentType) {
        
        const URL = ` https://pokeapi.co/api/v2/type/${currentType}`
    
        axios.get(URL)
            .then((res) => {
                const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
                setPokemons(pokemonsByType)
            })
            .catch((err) => console.log(err))
    }
        
  }, [currentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemonName, currentType])

  useEffect(() => {
    setPokemonName("")
    input.current.value = ""
  },[currentType])
    
  return (
    <section className='min-h-screen  '>
        <Header />

        {/* Seccion de filtros y saludos */}
        <section className='grid grid-flow-row justify-center'>
            <div className='py-6 px-2 flex gap-2 text-2xl font-silkscreen justify-center p-4 mt-5'>

            <h3 className='before:content-["Welcome"]  before:text-red-600 before:font-bold '> </h3> <h3 className='text-red-600 font-bold'>   {nameTrainer},</h3> <h3>here you can find your favorite pokemon</h3>

            </div>

            <form onSubmit={handleSubmit} className='text-center flex gap-2 justify-center font-silkscreen p-4'>
                <div className='flex gap-2 '>
                    <input className=' text-center border-[4px] border-black' ref={input} id="pokemonName" type="text" placeholder='Search your pokemon'  />
                    <button className='border-[4px] p-2 bg-[#E83707] text-white'>Search</button>
                </div>

                <select onChange={(e) => setCurrentType(e.target.value)}>
                    <option className={`text-center border-[4px] `} value="">All</option>
                    {
                        types.map(type => <option className='capitalize' key={type} value={type}>{type}</option>)
                    }
                </select>
            </form>
        </section>

        {/* Seccion de paginacion */}
        <ul className='flex gap-3 justify-center py-4 px-2 flex-wrap'>

            {/* primera pagina */}
           <li onClick={() => setCurrentPage(1)} className='p-3  bg-[#E83707] font-bold text-white rounded-md cursor-pointer'>{"<<"}</li>

            {/* pagina anterior */}
            <li onClick={handlePreviousPage} className='p-3  bg-[#E83707] font-bold text-white rounded-md cursor-pointer'>{"<"}</li>

            { /* lista de paginas */}
            {
                pagesInBlock.map(numberPage => <li className={`p-3 bg-[#E83707] font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-[#e77a5c]"}`} key={numberPage} onClick={() => setCurrentPage(numberPage)}>{numberPage}</li>)
            }

            {/* pagina siguiente */}
            <li onClick={handleNextPage} className='p-3 bg-[#E83707] font-bold text-white rounded-md cursor-pointer'>{">"}</li>

            {/* ultima pagina */}
           <li onClick={() => setCurrentPage(lastPage)} className='p-3 bg-[#E83707] font-bold text-white rounded-md cursor-pointer'>{">>"}</li>

        </ul>

        {/* Seccion lista de pokemons */}
        <section className='px-2 grid gap-6 justify-center mt-4 mb-4 auto-rows-auto grid-cols-[repeat(auto-fill,_280px)]'>
            {
                pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />) 
            }
        </section>

    </section>
  )
}

export default Pokedex