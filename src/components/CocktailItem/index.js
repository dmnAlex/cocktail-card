import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'

const CocktailItem = ({ cocktail, handleLike }) => {
  const buttonStyle = cocktail.isFavorite
    ? {
      color: 'blue',
    }
    : {
      color: 'red',
    }

  const iconStyle = cocktail.isFavorite
    ? {
      name: 'heart outline'
    }
    : {
      name: 'heart'
    }

  return (
    <Card>
      <Image src={cocktail.image} size='medium' />
      <Card.Content>
        <Card.Header>{cocktail.title}</Card.Header>
        <Card.Meta>
          {`${cocktail.category}, ${cocktail.isAlcoholic}`}
        </Card.Meta>
        <Card.Description>
          {cocktail.ingedients.join(', ')}
        </Card.Description>
      </Card.Content>
      <Card.Content extra >
        <Button
          {...buttonStyle}
          fluid
          onClick={() => handleLike(cocktail.id)}
        >
          <Icon
            {...iconStyle}
          />
          {cocktail.isFavorite
            ? 'Remove'
            : 'Add'
          }
        </Button>
      </Card.Content>
    </Card>
  )
}



export default CocktailItem