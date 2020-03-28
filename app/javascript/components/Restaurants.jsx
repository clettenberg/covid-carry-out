import React from 'react'
import { CardColumns, Card } from 'react-bootstrap'

const Restaurants = ({ restaurants, countyId }) => (
  <CardColumns>
    {restaurants
      .filter(({ county }) => {
        if (countyId === -1) {
          return true
        }

        return countyId === parseInt(county.id)
      })
      .map(({ id, name, website }) => (
        <Card key={id}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Link href={website} target='_blank'>Website</Card.Link>
          </Card.Body>
        </Card>
      ))}
  </CardColumns>
)

export default Restaurants
