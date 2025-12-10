import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand"><Link to="/" style={{textDecoration:'none', color:'var(--accent)'}}>Recipe Finder</Link></div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  )
}
