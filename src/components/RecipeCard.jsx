import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeCard({ meal, onToggleFav, isFav }){
  if(!meal) return null
  return (
    <div className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <div className="meta">Category: {meal.strCategory || '—'}</div>
      <div style={{display:'flex', gap:8, marginTop:8}}>
        <Link to={`/recipe/${meal.idMeal}`} className="btn" style={{background:'#0ea5a4'}}>View</Link>
        <button className="btn" onClick={() => onToggleFav(meal)}>
          {isFav ? 'Remove' : 'Favorite'}
        </button>
      </div>
    </div>
  )
}
