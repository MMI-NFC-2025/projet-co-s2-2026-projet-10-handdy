import * as backend from '../../../backend/backend.mjs';
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { mode, email, password, username, passwordConfirm } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email et mot de passe requis.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    let auth;
    if (mode === 'signup') {
      if (!passwordConfirm) {
        return new Response(JSON.stringify({ message: 'La confirmation du mot de passe est requise.' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }

      await backend.registerUser({
        email,
        password,
        passwordConfirm,
        username: username || email.split('@')[0],
        pseudo: username || email.split('@')[0],
      });
      auth = await backend.login(email, password);
    } else {
      auth = await backend.login(email, password);
    }

    return new Response(JSON.stringify(auth), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('API auth error', error);
    const message = error?.data?.message || error?.message || 'Erreur serveur lors de l’authentification.';
    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
