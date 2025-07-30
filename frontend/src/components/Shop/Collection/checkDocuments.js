// checkDocuments.js
import Typesense from 'typesense';

const client = new Typesense.Client({
  nodes: [
    {
      host: 'tiau5xnegp7mok26p-1.a1.typesense.net',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: '2hHNQ7gnRIOzwcAPvAq2yzlRSWZFNQXS', // Admin API Key
  connectionTimeoutSeconds: 10,
});

(async () => {
  try {
    const result = await client.collections('products').documents().search({
      q: '*',
      query_by: 'name',
    });
    console.log('Documents:', result.hits);
  } catch (err) {
    console.error('Error fetching documents:', err);
  }
})();
