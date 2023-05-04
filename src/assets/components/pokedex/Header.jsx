import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainer } from '../../../store/slices/nameTrainer.slice'

const Header = () => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(setNameTrainer(""))
  }

  return (
   
    <section className='relative'>
    <div className='h-20 bg-[#E83707] grid items-end '>
        <div className='max-w-[100px] sm:max-w-[100px] ml-4 flex'>
            <img src="/images/pokedex03.png" alt="" />
            <h1 className='font-silkscreen text-yellow-400 text-6xl font-bold'>POKEDEX</h1>
        </div>
    </div>
    <div className='h-10 bg-black '></div>
    <div className='h-20 aspect-square rounded-full bg-white border-[8px] border-black absolute -bottom-5 right-3 -translate-x-1/2 after:content-[""] after:h-12 after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'><i onClick={handleLogout} className='bx bx-log-out-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-white text-2xl hover:text-[#E83707] cursor-pointer' ></i></div>

    </section>

  )
}

export default Header