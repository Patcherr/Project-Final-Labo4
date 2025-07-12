import { Route, Switch } from "wouter";
import HeladoList from './components/helado/HeladoList.jsx';
import HeladoForm from './components/helado/HeladoForm.jsx';
import HeladoDetail from './components/helado/HeladoDetail.jsx';
import SalsaList from './components/salsa/SalsaList.jsx';
import SalsaForm from './components/salsa/SalsaForm.jsx';
import SalsaDetail from './components/salsa/SalsaDetail.jsx';
import IngredienteList from './components/Ingrediente/IngredienteList.jsx';
import IngredienteForm from './components/Ingrediente/IngredienteForm.jsx';
import IngredienteDetail from './components/Ingrediente/IngredienteDetail.jsx';
import Home from './components/Home/Home.jsx';

function App() {

  return (
    <>
      <div className="container">     
      <Switch>
        {/* Home */}
         <Route path="/" component={Home} />

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
