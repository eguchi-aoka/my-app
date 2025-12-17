import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Home from './page/home'
import About from './page/about'
import './App.css'

function App() {
   return (
   <BrowserRouter>
   <nav>
    <ul>
     <li><Link to="/">Home</Link></li>
     <li><Link to="/about">About</Link></li>
     </ul>
       <hr />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
     </Routes>
   </nav>
</BrowserRouter>
   )
}

export default App
