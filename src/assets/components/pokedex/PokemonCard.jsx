import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const borderByType = {
  grass: 'border-[#bad6aa]',
  fire: 'border-[#fd7d24]',
  water: 'border-[#4592c4]',
  bug: 'border-[#729f3f]',
  normal: 'border-[#a4acaf]',
  poison: 'border-[#b97fc9]',
  electric: 'border-[#eed535]',
  ground: 'border-[#ab9842]',
  fairy: 'border-[#fdb9e9]',
  fighting: 'border-[#d56723]',
  psychic: 'border-[#f366b9]',
  rock: 'border-[#a38c21]',
  ghost: 'border-[#7b62a3]',
  ice: 'border-[#51c4e7]',
  dragon: 'border-[#f16e57]',
  dark: 'border-[#707070]',
  steel: 'border-[#9eb7b8]',
  flying: 'border-[#3dc7ef]',
}

const backgroundByType = {
  grass: 'from-[#82c1c9] to-[#bad6aa]',
  fire: 'from-[#F96D6F] to-[#E8AE1B]',
  water: 'from-[#133258] to-[#1479FB]',
  bug: 'from-[#729f3f] to-[#a8b820]',
  normal: 'from-[#a4acaf] to-[#c3c3c1]',
  poison: 'from-[#b97fc9] to-[#a040a0]',
  electric: 'from-[#eed535] to-[#f7d038]',
  ground: 'from-[#654008] to-[#D69638]',
  fairy: 'from-[#fdb9e9] to-[#ee99ac]',
  fighting: 'from-[#d56723] to-[#eb4971]',
  psychic: 'from-[#f366b9] to-[#fba8c9]',
  rock: 'from-[#a38c21] to-[#b6a136]',
  ghost: 'from-[#323569] to-[#787DDA]',
  ice: 'from-[#6FBEDF] to-[#BDEBFE]',
  dragon: 'from-[#f16e57] to-[#fcb6a7]',
  dark: 'from-[#030706] to-[#5A5E5D]',
  steel: 'from-[#9eb7b8] to-[#d1d1e0]',
  flying: 'from-[#3dc7ef] to-[#bdb9b8]',

}

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

const PokemonCard = ({pokemonUrl}) => {
  const [pokemon, setPokemon] = useState()

  const pokemonTypes = pokemon?.types.slice(0,2).map(type => type.type.name).join(' / ')



  useEffect(() => {
    axios.get(pokemonUrl)
    .then((res) => setPokemon(res.data))
    .catch((err) => console.log(err))
  },[])
  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${borderByType[pokemon?.types[0].type.name]}`}>
      
    {/* Seccion superior - Fondo con degradado */}
     <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px] grid-flow-row justify-center`}>
      <div className='absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2 '>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </div>
    </section>

    {/*Seccion inferior - fondo blanco */}

    <section>
      <h3 className='mt-10 capitalize font-silkscreen'>{pokemon?.name}</h3>
      <span className='font-silkscreen'>type</span>
      <h4 className={`${textType[pokemon?.types[0].type.name]} font-silkscreen`} >{pokemonTypes}</h4>

      <hr />

      {/*stats*/}
      <section className='grid grid-cols-3 gap-2 p-2'>
        {
          pokemon?.stats.map(stat => (
            <div key={stat.stat.name}>
              <h5 className='capitalize font-silkscreen text-sm'>{stat.stat.name}</h5>
              <span className='font-silkscreen text-lg text-red-600'>{stat.base_stat}</span>
            </div>
          ))
        }
      </section>
    </section>

    {/*Boton para retornar a la pagina principal */}

    

    </Link>
  )
}

export default PokemonCard