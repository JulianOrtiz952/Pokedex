import React from 'react'
import Footer from '../assets/components/Footer'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate('/Pokedex')
    }

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto] bg-[url("/images/pokemon_collage2.png")]'>
        {/* Parte superio */}
        <section>
            <article className='grid justify-center text-center'>
                <div className='max-w-[450px] p-4 mt-10'>
                    <img src="/images/pokedex02.png" alt="" />
                   
                </div>
                <div className='bg-black border-solid border-[8px] border-gray-300 rounded-md p-6 grid justify-center'>

                <h2 className='text-4xl p-4 text-[white] font-silkscreen font-bold'>Hello Trainer!</h2>
                <p className='font-silkscreen text-1xl text-white'>before starting, please tell us your name: </p>

                </div>
            </article>
            <form onSubmit={handleSubmit} className='flex justify-center gap-2 p-4 mt-10'>
                <input className='border-2 text-center p-2 rounded-md' id='nameTrainer' type="text" placeholder='your name...' />
                <button className='font-bold bg-[#E83707] text-white w-[130px] rounded-md font-silkscreen'>Start</button>
            </form>
        </section>

        {/* footer */}
        <Footer />
    </section>
  )
}

export default Home