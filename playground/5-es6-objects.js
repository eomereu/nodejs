// Object Property Shorthand
const name = 'Omer'
const userAge = 25

const user = {
  name,
  age: userAge,
  location: 'Wien'
}

console.log(user)

//Object Destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 2021,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock

const {label:productLabel, stock, rating = 5} = product
console.log(productLabel)
console.log(stock)
console.log(rating)

const transaction = (type, {label, stock = 0} = {}) => {
    console.log(type, label, stock)
  }

transaction('order', product)