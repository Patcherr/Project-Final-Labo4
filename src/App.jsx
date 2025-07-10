import { Route, Switch } from "wouter";
import EmpleadoList from "./components/EmpleadoList";
import EmpleadoForm from "./components/EmpleadoForm";
import EmpleadoDetail from "./components/EmpleadoDetail";

function App() {

  return (
    <>
      <div className="container">
        <h1>Gestion de empleados</h1>
        <Switch>
          <Route path="/" component={EmpleadoList} />
          <Route path="/empleados/nuevo" component={EmpleadoForm} />
          <Route path="/empleados/:id/editar" component={EmpleadoForm} />
          <Route path="/empleados/:id" component={EmpleadoDetail} />
        </Switch>
      </div>
    </>
  )
}

export default App
