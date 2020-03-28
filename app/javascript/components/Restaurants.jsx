import { fetch } from 'whatwg-fetch'
import React, { Component } from 'react'
import { Container, CardColumns, Card } from 'react-bootstrap'

class Restaurants extends Component {
  constructor (props) {
    super(props)

    this.state = {
      restaurants: [],
      err: []
    }
  }

  async fetchRestaurants () {
    const res = await fetch('/api/restaurants')
    res
      .json()
      .then(restaurants => this.setState({ restaurants }))
      .catch(err => this.setState({ err }))
  }

  componentDidMount () {
    this.fetchRestaurants()
  }

  render () {
    const {
      restaurants
    } = this.state

    return (
      <CardColumns>
        {restaurants.map(({ id, name, website }) => (
          <Card key={id}>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Link href={website} target='_blank'>Website</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    )
  }
}

export default Restaurants
