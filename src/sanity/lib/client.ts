import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, secretToken } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: secretToken,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
