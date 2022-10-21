const fs = require('fs');
const path = require('path');
const { makeSlug } = require('./helpers');

const getJsonFile = (name) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${name}.json`), 'utf8').toString());

const randomNumber = (min, max) => Math.ceil(Math.random() * (max - min) + min);

const categories = getJsonFile('categories').map(({ id, name, image, tags, banner }) => ({
  id,
  name,
  image: `static/images/categories/${image}`,
  slug: makeSlug(name),
  tags: tags.map((it) => ({
    name: it,
    slug: `${makeSlug(name)}/${makeSlug(it)}`,
  })),
  banners: banner,
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
}));

const products = getJsonFile('products').map(
  ({ name, price, salePrice, images, categoryId }, idx) => ({
    id: idx,
    name,
    price,
    salePrice,
    categoryId,
    images,
    slug: makeSlug(name),
    view: randomNumber(1000, 100000),
    quantity_sold: randomNumber(100, 5000),
    createdAt: new Date().getTime() + idx,
    updatedAt: new Date().getTime() + idx,
  })
);

const footers = getJsonFile('footers');

fs.writeFileSync('db.json', JSON.stringify({ categories, products, footers }));
