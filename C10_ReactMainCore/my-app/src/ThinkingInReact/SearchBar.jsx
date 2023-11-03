import React, { Component } from 'react'

export class SearchBar extends Component {
  render() {
    return (
      <form>
        <input type='text' placeholder='search' />
        <div>
          <input type='checkbox' /> Only show products in stock
        </div>
      </form>
    )
  }
}

export default SearchBar
