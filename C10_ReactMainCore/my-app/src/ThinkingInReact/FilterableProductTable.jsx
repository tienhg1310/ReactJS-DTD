import React, { Component } from 'react'
import './FilterableProductTable.css'
import SearchBar from './SearchBar'
import ProductTabel from './ProductTabel'

const productList = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
]

export class FilterableProductTable extends Component {
  render() {
    return (
      <div className='FilterableProductTable'>
        <SearchBar />
        <ProductTabel productList={productList} />
      </div>
    )
  }
}

export default FilterableProductTable
