import React from 'react'
import RecipeCard from './RecipeCard'

export default function RecipeList({ meals = [], onToggleFav, favorites = [] }){
  return (
    <div className="grid">
      {meals.map(m => (
        <RecipeCard
          key={m.idMeal}
          meal={m}
          onToggleFav={onToggleFav}
          isFav={favorites.some(f => f.idMeal === m.idMeal)}
        />
      ))}
    </div>
  )
}
