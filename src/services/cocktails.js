import axios from 'axios'
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1'

const getList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/filter.php?c=Cocktail`)
    if (response.data) {
      const cocktails = response.data.drinks.map(item => createListItem(item))
      const result = await Promise.all(cocktails)

      return result
    } else {
      return null
    }
  } catch (error) {
    throw new Error('Unable to get cocktails list')
  }
}

const createListItem = async (item) => {
  const id = item.idDrink
  const response = await axios.get(`${baseUrl}/lookup.php?i=${id}`)
  if (response.data && response.data.drinks) {
    const cocktail = response.data.drinks[0]

    const result = {
      id: cocktail.idDrink,
      title: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
      category: cocktail.strCategory,
      isAlcoholic: cocktail.strAlcoholic,
      ingedients: [],
      isFavorite: false
    }

    for (let i = 1; i <= 15; i++) {
      const item = cocktail[`strIngredient${i}`]
      if (item) {
        result.ingedients.push(item)
      }
    }

    return result
  } else {
    return null
  }
}

const cocktailService = { getList }

export default cocktailService