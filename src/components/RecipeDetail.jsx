import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMealById } from '../services/api'

export default function RecipeDetail(){
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getMealById(id)
      .then(m => { if(mounted) setMeal(m) })
      .catch(e => { if(mounted) setError(e.message || 'Error') })
      .finally(() => { if(mounted) setLoading(false) })
    return () => { mounted = false }
  }, [id])

  if(loading) return <div className="card">Loading...</div>
  if(error) return <div className="card">Error: {error}</div>
  if(!meal) return <div className="card">Recipe not found</div>

  const ingredients = []
  for(let i=1;i<=20;i++){
    const ing = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if(ing && ing.trim()) ingredients.push(`${ing} - ${measure || ''}`)
  }

  return (
    <div className="detail">
      <div className="left card">
        <img src={meal.strMealThumb} alt={meal.strMeal} style={{width:'100%', borderRadius:8}}/>
        <h2>{meal.strMeal}</h2>
        <div className="meta">{meal.strCategory} • {meal.strArea}</div>
        <div style={{marginTop:12}}>
          <h4>Ingredients</h4>
          <div className="ingredients">
            {ingredients.map((it, idx) => <div key={idx} className="ingredient">{it}</div>)}
          </div>
        </div>
      </div>

      <div className="right card">
        <h3>Instructions</h3>
        <p style={{lineHeight:1.6}}>{meal.strInstructions}</p>
        {meal.strYoutube && (
          <p>
            <a href={meal.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube</a>
          </p>
        )}
      </div>
    </div>
  )
}
