import React, { useState } from 'react'

export default function SearchBar({ onSearch, initial = '' }){
  const [q, setQ] = useState(initial)

  const submit = (e) => {
    e?.preventDefault()
    const trimmed = q.trim()
    if(!trimmed) return
    onSearch(trimmed)
  }

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        className="input"
        placeholder="Search recipes (example: chicken, pasta)..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="btn" type="submit">Search</button>
    </form>
  )
}
