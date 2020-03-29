import { fetch } from 'whatwg-fetch'
import React from 'react'
import Restaurants from './Restaurants'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Spinner from './Spinner'
import CountySelect from './CountySelect'
import CuisineSelect from './CuisineSelect'
class App extends React.Component {
  constructor (props) {
    super(props)

    this.handleCountyChange = this.handleCountyChange.bind(this)
    this.handleCuisineChange = this.handleCuisineChange.bind(this)

    this.state = {
      restaurants: [],
      err: [],
      countyId: -1,
      cuisineId: -1,
      hasFetchedRestaurants: false
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

  handleCountyChange (e) {
    const countyId = parseInt(e.target.value)
    this.setState({ countyId, cuisineId: -1 })
  }

  handleCuisineChange (e) {
    const cuisineId = parseInt(e.target.value)
    this.setState({ cuisineId })
  }

  componentDidMount () {
    this.fetchRestaurants()
      .then(restaurants => {
        this.setState({
          restaurants,
          hasFetchedRestaurants: true
        })
      })
  }

  spinner () {
    return (
      <div
        style={{
          marginTop: '30px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '80px'
        }}
      >
        <Spinner />
      </div>
    )
  }

  generateIdNameMap ({ things, name }) {
    const mapOfThings = new Map()
    things.forEach(r => {
      mapOfThings.set(r[name].id, r[name].name)
    })
    return mapOfThings
  }

  render () {
    const {
      restaurants,
      countyId,
      cuisineId,
      hasFetchedRestaurants
    } = this.state

    if (!hasFetchedRestaurants) {
      return this.spinner()
    }

    const countiesMap = this.generateIdNameMap({ things: restaurants, name: 'county' })

    const resFilteredByCounty = restaurants
      .filter(({ county }) => {
        if (countyId === -1) { return true }

        return countyId === parseInt(county.id)
      })

    const cuisinesMap = this.generateIdNameMap({ things: resFilteredByCounty, name: 'cuisine' })

    const resFilteredByCountyAndCuisine =
      resFilteredByCounty.filter(({ cuisine }) => {
        if (cuisineId === -1) { return true }

        return cuisineId === parseInt(cuisine.id)
      })

    return (
      <>
        <Navbar bg='light'>
          <Navbar.Brand href='#home'>Covid Carry Out - STL</Navbar.Brand>
        </Navbar>
        <Container style={{ marginTop: '20px' }}>
          <CountySelect
            onChange={this.handleCountyChange}
            counties={[...countiesMap]}
            countyId={countyId}
          />
          <CuisineSelect
            onChange={this.handleCuisineChange}
            cuisines={[...cuisinesMap]}
            cuisineId={cuisineId}
          />
          <Restaurants
            restaurants={resFilteredByCountyAndCuisine}
            countyId={countyId}
            cuisineId={cuisineId}
          />
        </Container>
      </>
    )
  }
}

export default App
