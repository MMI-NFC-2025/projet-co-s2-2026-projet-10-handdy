import PocketBase from 'pocketbase';

// Astro charge les variables d'environnement via import.meta.env
const pb = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL);

export default pb;