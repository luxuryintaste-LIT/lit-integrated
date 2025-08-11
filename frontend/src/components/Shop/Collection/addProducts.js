import Typesense from 'typesense';

const client = new Typesense.Client({
  nodes: [
    {
      host: 'tiau5xnegp7mok26p-1.a1.typesense.net',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: '2hHNQ7gnRIOzwcAPvAq2yzlRSWZFNQXS',
  connectionTimeoutSeconds: 10,
});

// ✅ Include 'popularity' for each product
const products = [
  {
    id: '1',
    name: 'Red Sneakers',
    description: 'Comfortable red sneakers for running.',
    brand: 'Nike',                               // ✅ new
    originalPrice: 5000,                             // ✅ new
    price: 3500,                              // ✅ new
    discount: 30,                                      // ✅ new
    tags: ['shoes', 'red', 'sports'],
    popularity: 80,
  },
  {
    id: '2',
    name: 'Blue T-shirt',
    description: 'Stylish blue t-shirt made of cotton.',
    brand: 'H&M',                                // ✅ new
    originalPrice: 1200,                             // ✅ new
    price: 900,                               // ✅ new
    discount: 25,                                      // ✅ new
    tags: ['clothing', 'blue', 'tshirt'],
    popularity: 65,
  },
];


(async () => {
  for (const product of products) {
    try {
      const result = await client
        .collections('products')
        .documents()
        .create(product);
      console.log('Indexed:', result);
    } catch (err) {
      console.error('Error indexing:', err);
    }
  }
})();
