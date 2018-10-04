let cat = require('cat-me');
let joke = require('knock-knock-jokes');
let faker = require('faker');

for(let i = 0; i < 10; i++) {
  console.log(faker.commerce.productName(), faker.commerce.price());
}
