
import { useEffect, useState } from 'react'
import Header from '../assets/components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'


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

  const backgorundType = {
    grass: 'bg-[#bad6aa]',
    fire: 'bg-[#fd7d24]',
    water: 'bg-[#4592c4]',
    bug: 'bg-[#729f3f]',
    normal: 'bg-[#a4acaf]',
    poison: 'bg-[#b97fc9]',
    electric: 'bg-[#eed535]',
    ground: 'bg-[#ab9842]',
    fairy: 'bg-[#fdb9e9]',
    fighting: 'bg-[#d56723]',
    psychic: 'bg-[#f366b9]',
    rock: 'bg-[#a38c21]',
    ghost: 'bg-[#7b62a3]',
    ice: 'bg-[#51c4e7]',
    dragon: 'bg-[#f16e57]',
    dark: 'bg-[#707070]',
    steel: 'bg-[#9eb7b8]',
    flying: 'bg-[#3dc7ef]',
  }


const PokemonInfo = () => {

    const [pokemon, setPokemon] = useState()

    const {id} = useParams()
    

    useEffect(() => {
        const URL = ` https://pokeapi.co/api/v2/pokemon/${id}/`

        axios.get(URL)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.log(err))
        
    },[])

    const getStatusBar = (stat_base) => {
        const barProgress = Math.floor(stat_base * 100 / 255)
        return `${barProgress}%` 
    }

  return (
    <section className={`bg-[url("/images/pokemon_collage2.png")]`}>
        <Header />

        <section className='px-2 py-10'>
            <article className='mx-auto border-[2px] rounded-md p-2 max-w-[1080px] shadow-xl bg-white'>
                {/*Sección superior */}
                <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px] rounded-md`}>

                <div className='absolute -bottom-12 w-[250px] left-1/2 -translate-x-1/2 '>
                    <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                </div>

                </section>

                {/* Información general */}
                <section className='font-silkscreen'>
                <div>
                    <h3 className='text-center mt-8 p-4'>#{pokemon?.id}</h3>
                </div>
                
                <div className='grid grid-cols-[1fr_auto_1fr] items-center justify-center gap-2 p-2 mt-4'>   
                    <hr />
                    <h2 className='capitalize font-bold'>{pokemon?.name}</h2>
                    <hr />
                </div>

                <div className='flex justify-center gap-7 text-center p-2'>
                    <div>
                        <h5>Weight</h5>
                        <span>{pokemon?.weight}</span>
                    </div>

                    <div>
                        <h5>Height</h5>
                        <span>{pokemon?.height}</span>
                    </div>
                </div>

                <section className='grid md:grid-cols-2 gap-4 p-5'>
                    {/* Tipos */}
                    <section className='text-center'>
                    <h3>Types</h3>

                    <section className='grid grid-cols-2 gap-2 mt-4'>
                        {
                            pokemon?.types.map(type => 
                                <article key={type.type.name} className={`p-2 px-8 border-[1px] border-gray-300 ${backgorundType[type.type.name]} capitalize`} >{type.type.name}</article>)
                        }
                    </section>

                    </section>
                    {/* habilidades */}
                    <section>
                     <h3 className='text-center'>Abilities</h3>
                     <section className='grid grid-cols-2 gap-2 mt-4 text-center truncate'>
                    {
                            pokemon?.abilities.map(ability => 
                                <article key={ability.ability.name} className={`p-2 px-8 border-[1px] border-gray-300  capitalize`} >{ability.ability.name}</article>)

                        }
                     </section>
                    </section>
                </section>

                </section>



                {/* Stats */}
                <section className='p-5'>
                    <h3 className='font-silkscreen'>Stats</h3>

                    <section className='font-silkscreen'>
                    {
                        pokemon?.stats.map(stat => (
                            <article key={stat.stat.name}>
                                <section className='flex justify-between'>
                                    <h5 className='capitalize'>{stat.stat.name}</h5>

                                    <span>{stat.base_stat}/255</span>
                                </section>
                                <div className='bg-gray-100 h-6 rounded-sm'>
                                <div style={{"width":getStatusBar(stat.base_stat)}} className={`h-full  bg-gradient-to-r from-yellow-400 to-yellow-500`}> </div>

                                </div>
                            </article>
                        ))
                    }

                    </section>
                </section>
            </article>
        </section>
    </section>
  )
}

export default PokemonInfo