import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import { FaLink, FaPhone, FaMapMarkedAlt } from 'react-icons/fa'

const duckDuckGoMapSearchUrl = (name, address) => {
  const query = encodeURIComponent(`${name} ${address}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

const Restaurants = ({ restaurants, countyId, cuisineId }) => (
  <CardColumns>
    {restaurants.map(({ id, name, website, telephone, address }) => (
      <Card key={id}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Link href={website} target='_blank'>
            <FaLink />
          </Card.Link>
          <Card.Link href={`tel:${telephone}`} target='_blank'>
            <FaPhone />
          </Card.Link>
          <Card.Link href={duckDuckGoMapSearchUrl(name, address)} target='_blank'>
            <FaMapMarkedAlt />
          </Card.Link>
        </Card.Body>
      </Card>
    ))}
  </CardColumns>
)

export default Restaurants
