const KEY = 'pb_auth';

export function getAuth() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
  catch { return null; }
}

export function saveAuth(auth) {
  if (!auth?.token || !auth?.record?.id) return;
  localStorage.setItem(KEY, JSON.stringify(auth));
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}

export async function validateAuth() {
  const auth = getAuth();
  if (!auth?.token) return { valid: false };


  try {
    const res = await fetch('/api/auth-validate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: auth.token }) });
    if (!res.ok) throw new Error();
    const data = await res.json(); 
    
    saveAuth({ token: auth.token, record: data.record });
    return { valid: true, record: data.record };
  } catch {
    clearAuth();
    return { valid: false };
  }
}
