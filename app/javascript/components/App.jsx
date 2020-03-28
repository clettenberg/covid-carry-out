import { fetch } from 'whatwg-fetch'
import React from 'react'
import Restaurants from './Restaurants'
import { Navbar } from 'react-bootstrap'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      restaurants: [],
      err: []
    }
  }

  fetchRestaurants () {
    return fetch('/api/restaurants')
      .then(results => results.json())
      .then(results => {
        return results.errors
          ? Promise.reject(Error.new('Error fetching restaurants'))
          : Promise.resolve(results)
      })
  }

  componentDidMount () {
    this.fetchRestaurants()
      .then(restaurants => {
        this.setState({ restaurants })
      })
  }

  render () {
    const {
      restaurants
    } = this.state

    return (
      <>
        <Navbar bg='light'>
          <Navbar.Brand href='#home'>Covid Carry Out - STL</Navbar.Brand>
        </Navbar>
        <div style={{ marginTop: '20px' }} className='container'>
          <Restaurants restaurants={restaurants} />
        </div>
      </>
    )
  }
}

export default App
