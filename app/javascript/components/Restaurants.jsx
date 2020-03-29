import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import { FaLink, FaPhone, FaMapMarkedAlt, FaClock } from 'react-icons/fa'
import { IoIosPricetags } from 'react-icons/io'

const duckDuckGoMapSearchUrl = (name, address) => {
  const query = encodeURIComponent(`${name} ${address}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

const Restaurants = ({ restaurants, countyId, cuisineId }) => (
  <CardColumns>
    {restaurants.map(({ id, name, website, telephone, address, hours, services, menus, specialDeals }) => (
      <Card key={id}>
        <Card.Header>
          <Card.Title>
            {name}
          </Card.Title>
          <Card.Subtitle>
            <div className='mb-2'>
              {services.map(service => (
                <Badge key={service} variant='secondary' className='mr-1'>{service}</Badge>
              ))}
              {menus.indexOf('limited menu') > -1 &&
                <Badge variant='danger' className='mr-1'>Limited Menu</Badge>}
              {menus.indexOf('family meals') > -1 &&
                <Badge variant='info' className='mr-1'>Family Meals</Badge>}
            </div>
            {website &&
              <Card.Link href={website} target='_blank' rel='noopener noreferrer'>
                <FaLink />
              </Card.Link>}
            {telephone &&
              <Card.Link href={`tel:${telephone}`} target='_blank' rel='noopener noreferrer'>
                <FaPhone />
              </Card.Link>}
            {name && address &&
              <Card.Link href={duckDuckGoMapSearchUrl(name, address)} target='_blank' rel='noopener noreferrer'>
                <FaMapMarkedAlt />
              </Card.Link>}
          </Card.Subtitle>

        </Card.Header>
        <ListGroup variant='flush'>
          {hours &&
            <ListGroup.Item>
              <FaClock /> {hours}
            </ListGroup.Item>}
          {specialDeals &&
            <ListGroup.Item><IoIosPricetags /> {specialDeals}</ListGroup.Item>}
        </ListGroup>
      </Card>
    ))}
  </CardColumns>
)

export default Restaurants
