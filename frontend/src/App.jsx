import { useState } from 'react'
import Home from './components/Home';
import Passenger from './components/Passenger.jsx';
import Bus from './components/Bus.jsx';
import Travel from './components/Travel.jsx';
import About from './components/About';
import Pdf from './components/Pdf';
import './App.css'

function App() {
  const [page, setPage] = useState('home');

  const handle = (arg) => {
      setPage(arg);
  }
  return (
    <div className="app-shell">
      <ul>
        <li><a style={{color: 'white'}} onClick={() => handle('home')}>Home</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('car')}>Car</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('customer')}>Customers</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('rental')}>Rentals</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('pdf')}>Pdf</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('about')}>About</a></li>
      </ul>
      <main className={page === 'home' ? 'page-content page-content--home' : 'page-content'}>
        {page === 'home' && <Home/>}
        {page === 'car' && <Bus/>}
        {page === 'customer' && <Passenger/>}
        {page === 'rental' && <Travel/>}
        {page === 'pdf' && <Pdf/>}
        {page === 'about' && <About/>}
      </main>
    </div>
  )
}

export default App
