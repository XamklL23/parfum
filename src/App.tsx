// ACÁ BORRAMOS TOCO Y SOLO NOS QUEDAMOS CON FUNCTION APP Y EXPORT DEFAUL APP
//ESTO TAMBIEN FORMA PARTE DE LA PRUEBA
// import { perfumes } from "./data/perfumes"
// import ProductCard from "./components/ProductCard"
import CartPage from "./pages/CartPage" 
import HomePage from "./pages/HomePage"
import CheckoutPage from "./pages/CheckoutPage"
import ProductPage from "./pages/ProductPage"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes ,Route } from "react-router-dom"


function App() {
  return(
    //ESTO LO UTILIZAMOS PARA VALIDAR LA FUNCIONABILIDAD DE LA CATEGORIA DE PERFUMES

    // <div className="min-h-screen bg-neutral-50">
    //   <header className="py-10 text-center">
    //     <h1 className="text-4xl font-serif text-neutral-800">Perfumería Aura</h1>
    //     <p className="text-neutral-500 mt-2">Fragancias seleccionadas</p>
    //   </header>

    //   <main className="max-w-6xl mx-auto px-6 pb-16">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {/* Determinamos entre llaves {} lo que vamos a reutilizar de los otros archivos
    //       se usa key para el tema de busqueda en base al id nada más, recuerda que el map nos permite la busqueda de un objeto
    //       en este caso le especificamos con id */}
    //       {perfumes.map((perfume) => (
    //         <ProductCard key={perfume.id} perfume={perfume} />
    //       ))}
    //     </div>
    //   </main>
    // </div>


    //ESTO LO HICIMOS INSTALANDO EL react-router-dom y el zustand, incluso tambien el lucide-react para los logoss
    //empleamos lo del react-router-dom para lo del enrutamiento
    //zustand para el tema de la funcionalidad del carrito
    //lucide react para iconos
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producto/:id" element={<ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      
    </BrowserRouter>
  )
}

export default App
