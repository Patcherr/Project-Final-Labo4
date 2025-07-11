import { Route, Switch } from "wouter";
import { Link } from "wouter";
import HeladoList from './components/helado/HeladoList.jsx';
import HeladoForm from './components/helado/HeladoForm.jsx';
import HeladoDetail from './components/helado/HeladoDetail.jsx';
import SalsaList from './components/salsa/SalsaList.jsx';
import SalsaForm from './components/salsa/SalsaForm.jsx';
import SalsaDetail from './components/salsa/SalsaDetail.jsx';
import IngredienteList from './components/ingrediente/IngredienteList.jsx';
import IngredienteForm from './components/ingrediente/IngredienteForm.jsx';
import IngredienteDetail from './components/ingrediente/IngredienteDetail.jsx';


function App() {

  return (
    <>
      <div className="container">
      <img src="/src/assets/logoHelarte.png" alt="." />
      <h1>Heladería - Administración</h1>
      
       
      <nav>
       
        <Link href="/helados">Helados</Link>
        <Link href="/salsas">Salsas</Link>
        <Link href="/ingredientes">Ingredientes</Link>
      </nav>

      <Switch>
        {/* Helados */}
        <Route path="/helados" component={HeladoList} />
        <Route path="/helados/nuevo" component={HeladoForm} />
        <Route path="/helados/:id/editar" component={HeladoForm} />
        <Route path="/helados/:id" component={HeladoDetail} />
        
        {/* Salsas */}
        <Route path="/salsas" component={SalsaList} />
        <Route path="/salsas/nueva" component={SalsaForm} />
        <Route path="/salsas/:id/editar" component={SalsaForm} />
        <Route path="/salsas/:id" component={SalsaDetail} />

        {/* Ingredientes */}
        <Route path="/ingredientes" component={IngredienteList} />
        <Route path="/ingredientes/nuevo" component={IngredienteForm} />
        <Route path="/ingredientes/:id/editar" component={IngredienteForm} />
        <Route path="/ingredientes/:id" component={IngredienteDetail} />

  
        
        <Route>404 - Página no encontrada</Route>
      </Switch>
    </div>
    </>
  )
}

export default App
