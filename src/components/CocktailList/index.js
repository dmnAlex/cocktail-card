import React, { useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react'
import cocktailService from '../../services/cocktails'
import CocktailItem from '../CocktailItem'

const CocktailList = () => {
  const [cocktails, setCocktails] = useState()

  useEffect(() => {
    cocktailService.getList().then(data => setCocktails(data))
  }, [])

  const handleLike = (id) => {
    const newArray = cocktails.map(item => item.id === id
      ? { ...item, isFavorite: !item.isFavorite }
      : item
    )
    newArray.sort(compare)
    setCocktails(newArray)
  }

  const compare = (a, b) => {
    const d1 = (a.isFavorite === b.isFavorite)
      ? 0
      : a.isFavorite
        ? -1
        : 1
    const d2 = a.title.toLowerCase() >= b.title.toLowerCase()
      ? 0.1
      : -0.1
    return d1 + d2
  }

  return (
    cocktails
      ? (
        <Card.Group itemsPerRow={5}>
          {cocktails.map(
            cocktail =>
              <CocktailItem
                cocktail={cocktail}
                key={cocktail.id}
                handleLike={handleLike}
              />)
          }
        </Card.Group>
      )
      : (
        <div>
          Loading...
        </div>
      )
  )
}

export default CocktailList