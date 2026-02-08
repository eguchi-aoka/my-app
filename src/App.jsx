import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Home from './page/home'
import About from './page/about'
import Contact from './page/contact'
import Weather from './page/weather'
import './App.css'

function App() {
   return (
   <BrowserRouter>
   <nav>
    <ul>
     <li><Link to="/">Home</Link></li>
     <li><Link to="/about">About</Link></li>
     <li><Link to="/contact">Contact</Link></li>
     <li><Link to="/weather">Weather</Link></li>
     </ul>
       <hr />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/weather' element={<Weather />} />
     </Routes>
   </nav>
</BrowserRouter>
   )
}

export default App
