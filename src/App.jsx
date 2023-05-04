import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Pokedex from "./pages/Pokedex"
import ProtectedAuth from "./assets/components/auth/ProtectedAuth"
import PokemonInfo from "./pages/PokemonInfo"


function App() {
  

  return (
    <section>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedAuth />}>

        <Route path="/pokedex" element={<Pokedex />} />

        <Route path= "/pokedex/:id" element={<PokemonInfo />}> </Route>

        </Route>

      </Routes>
    </section>
  )
}

export default App
