const BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function searchMeals(query){
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`)
  if(!res.ok) throw new Error('Network error')
  const data = await res.json()
  return data.meals // may be null
}

export async function getMealById(id){
  const res = await fetch(`${BASE}/lookup.php?i=${id}`)
  if(!res.ok) throw new Error('Network error')
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}
