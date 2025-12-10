import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import RecipeList from '../components/RecipeList'
import { searchMeals } from '../services/api'

const STORAGE_KEY = 'rf_favorites_v1'

export default function Home(){
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    // default search
    handleSearch('chicken')
    // eslint-disable-next-line
  }, [])

  const handleSearch = async (q) => {
    setLoading(true)
    setError(null)
    try {
      const data = await searchMeals(q)
      setMeals(data || [])
    } catch (err) {
      setError(err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const toggleFav = (meal) => {
    const exists = favorites.some(f => f.idMeal === meal.idMeal)
    const next = exists ? favorites.filter(f => f.idMeal !== meal.idMeal) : [meal, ...favorites]
    setFavorites(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return (
    <div>
      <div className="hero">
        <h1>Find delicious recipes</h1>
        <p className="meta">Search and save your favorite meals</p>
        <SearchBar onSearch={handleSearch} initial="chicken" />
      </div>

      {loading && <div className="card">Loading...</div>}
      {error && <div className="card">Error: {error}</div>}
      {!loading && !error && meals && meals.length === 0 && (
        <div className="card">No recipes found. Try another keyword.</div>
      )}

      {!loading && meals && meals.length > 0 && (
        <RecipeList meals={meals} onToggleFav={toggleFav} favorites={favorites} />
      )}
    </div>
  )
}
