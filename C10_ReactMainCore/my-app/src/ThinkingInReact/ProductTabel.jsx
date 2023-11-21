import React, { Component } from 'react'
import ProductRow from './ProductRow'
import ProductCategoryRow from './ProductCategoryRow'

export class ProductTabel extends Component {
  render() {
    const { productList } = this.props
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <ProductRow />
          <ProductCategoryRow />
          <ProductCategoryRow />
          <ProductCategoryRow />
        </tbody>
      </table>
    )
  }
}

export default ProductTabel
