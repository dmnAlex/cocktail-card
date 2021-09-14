import axios from 'axios'
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1'

const getList = async () => {
  const response = await axios.get(`${baseUrl}/filter.php?c=Cocktail`)
  const cocktails = response.data.drinks.map(item => createListItem(item))
  const result = await Promise.all(cocktails)

  return result
}

const createListItem = async (item) => {
  const id = item.idDrink
  const response = await axios.get(`${baseUrl}/lookup.php?i=${id}`)
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
}

const cocktailService = { getList }

export default cocktailService