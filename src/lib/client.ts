import { createClient } from '@sanity/client';





const client = createClient({
  projectId: 'xuha4g6e',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-04-27',
  
});





export default client;