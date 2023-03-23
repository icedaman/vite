import { useMemo, useRef, useState } from 'react'
import '../App.css'

function Search() {
  const [items, setItems] = useState<any[]>([])
  const [query, setQuery] = useState<any>("")
  const textInput = useRef<any>()

  function handleAddItem(e: any){
    e.preventDefault()
    const value = textInput!.current!.value
    if(value === '') return;
    setItems(prevState => {
      textInput!.current!.value = ''
      return [...prevState, value]
    })
  }

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return item.toLowerCase().includes(query.toLowerCase())
    })
  }, [items, query]) 
  

  return (
    <div className="App">
      <h1>Search Feature</h1>
      <form onSubmit={handleAddItem}>
        <div>
          <p>Find it</p>
          <input value={query} onChange={(e) => setQuery(e.target.value)}/>
        </div>
        <div className="card">
            <p>Add Item</p>
            <input type='text' ref={textInput} /> 
            <button type='submit'>Add</button>
        </div>
        <div className="card">
          <div className="read-the-docs">
            {filteredItems.map((item, index) => { 
              return (
                <p key={item+index}>{item}</p>
              )
            })}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
