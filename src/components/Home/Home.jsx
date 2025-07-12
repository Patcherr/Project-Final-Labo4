import { Link } from 'wouter';
import logo from '../../assets/logoHelarte.png'

export default function Home() {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo Helarte" className="home-logo" />
      <h1 className="home-title">Heladeria Helarte 🍦</h1>
      <p className="home-subtitle">¡Bienvenidos a Helarte! Donde cada sabor es una obra de arte.</p>

      <div className="home-buttons">
        <Link href="/helados"><button>Helados</button></Link>
        <Link href="/salsas"><button>Salsas</button></Link>
        <Link href="/ingredientes"><button>Ingredientes</button></Link>
      </div>
    </div>
  );
}