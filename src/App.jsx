import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Weather from './page/weather'
import './App.css'

function App() {
   return (
   <BrowserRouter>
   <nav>
    <ul>
     <li><Link to="/weather">Weather</Link></li>
     </ul>
       <hr />
     <Routes>
      <Route path='/weather' element={<Weather />} />
     </Routes>
   </nav>
</BrowserRouter>
   )
}

export default App
