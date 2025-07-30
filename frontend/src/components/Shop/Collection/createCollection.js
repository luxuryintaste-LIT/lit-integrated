import Typesense from 'typesense';


const client = new Typesense.Client({
  nodes: [
    {
      host: 'tiau5xnegp7mok26p-1.a1.typesense.net', // REPLACE with your actual node (without https://)
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: '2hHNQ7gnRIOzwcAPvAq2yzlRSWZFNQXS', // REPLACE with Admin API Key
  connectionTimeoutSeconds: 10,
});

const schema = {
  name: 'products',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'brand', type: 'string' },            // ✅ new field
    { name: 'originalPrice', type: 'float' },         // ✅ new field
    { name: 'price', type: 'float' },          // ✅ new field
    { name: 'discount', type: 'float' },               // ✅ new field
    { name: 'tags', type: 'string[]', facet: true },
    { name: 'popularity', type: 'int32' }
  ],
  default_sorting_field: 'popularity'
};


client.collections('products').delete() // optional, if re-creating
  .then(() => client.collections().create(schema))
  .then(data => console.log('Collection created:', data))
  .catch(err => console.error('Error creating collection:', err));

