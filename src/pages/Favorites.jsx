import React, { useEffect, useState } from 'react'
import RecipeList from '../components/RecipeList'

const STORAGE_KEY = 'rf_favorites_v1'

export default function Favorites(){
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    // keep in sync
    const handler = () => setFavorites(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const toggleFav = (meal) => {
    const next = favorites.filter(f => f.idMeal !== meal.idMeal)
    setFavorites(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <div className="card">No favorites yet — add some from search.</div>
      ) : (
        <RecipeList meals={favorites} onToggleFav={toggleFav} favorites={favorites} />
      )}
    </div>
  )
}
