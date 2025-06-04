import './App.css'
import Router from './Routes/Router'
import MyToaster from './Components/MyToaster'
import Header from './Components/Header'

function App() {
  return (
    <>
    <div className='h-screen flex flex-col w-full text-Text-Dark bg-BG-Primary font-SingleDay'>
      <MyToaster />
      <Header />
      < Router />
    </div>
    </>
  )
}

export default App
