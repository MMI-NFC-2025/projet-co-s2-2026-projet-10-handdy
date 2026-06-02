import * as backend from '../../../backend/backend.mjs';
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { mode, email, password, username, passwordConfirm } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email et mot de passe requis.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let auth;

    if (mode === 'signup') {
      if (!passwordConfirm) {
        return new Response(
          JSON.stringify({ message: 'Confirmation du mot de passe requise.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (password !== passwordConfirm) {
        return new Response(
          JSON.stringify({ message: 'Les mots de passe ne correspondent pas.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (password.length < 8) {
        return new Response(
          JSON.stringify({ message: 'Le mot de passe doit contenir au moins 8 caractères.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
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

    return new Response(
      JSON.stringify({ token: auth.token, record: auth.record }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('API auth error:', error);

    const err = error as any;
    let message = 'Erreur serveur.';

    if (err?.response?.data?.message) {
      message = err.response.data.message;
    } else if (err?.data?.message) {
      message = err.data.message;
    } else if (err?.message) {
      message = err.message;
    }

    if (message.includes('Failed to authenticate')) {
      message = 'Email ou mot de passe incorrect.';
    } else if (message.includes('already exists') || message.includes('unique')) {
      message = 'Cet email est déjà utilisé.';
    } else if (message.includes('invalid email')) {
      message = 'Adresse email invalide.';
    }

    return new Response(
      JSON.stringify({ message }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
