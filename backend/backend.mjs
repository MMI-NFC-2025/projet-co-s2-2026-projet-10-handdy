import PocketBase from 'pocketbase';

const pbUrl = 'https://wenddy.bambou-franceschini.fr';
const pb = new PocketBase(pbUrl);

pb.authStore.modelCollection = 'utilisateurs'; 

export function getFileUrl(record, filename) {
  if (!record || !filename) return null;
  return `${pbUrl}/api/files/${record.collectionId}/${record.id}/${encodeURIComponent(filename)}`;
}

export async function badgesAll() {
  return await pb.collection('badges').getFullList({ sort: 'nom' });
}


export function getCurrentUser() {
  return pb.authStore.model;
}
export function isAuthenticated() {
  return pb.authStore.isValid;
}
export function getAuthToken() {
  return pb.authStore.token;
}
export function setAuth(token, model) {
  pb.authStore.save(token, model);
}

export async function badgeById(id) {
  return await pb.collection('badges').getOne(id);
}

export async function addBadge(data) {
  return await pb.collection('badges').create(data);
}

export async function updateBadge(id, data) {
  return await pb.collection('badges').update(id, data);
}

export async function gameTypesAll() {
  return await pb.collection('game_types').getFullList({ sort: 'nom' });
}

export async function gameTypeById(id) {
  return await pb.collection('game_types').getOne(id);
}

export async function addGameType(data) {
  // data: { nom, description }
  return await pb.collection('game_types').create(data);
}

export async function updateGameType(id, data) {
  return await pb.collection('game_types').update(id, data);
}


export async function signsAll({ search = '', thematicId = '' } = {}) {
  const filters = [];
  if (search) filters.push(`nom~"${search}"`);
  if (thematicId) filters.push(`thematic="${thematicId}"`);
  const filter = filters.join(' && ');
  return await pb.collection('signs').getFullList({
    filter: filter || undefined,
    sort: 'nom',
    expand: 'thematic',
  });
}

export async function signById(id) {
  return await pb.collection('signs').getOne(id, { expand: 'thematic' });
}

export async function addSign(data) {
  return await pb.collection('signs').create(data);
}

export async function updateSign(id, data) {
  return await pb.collection('signs').update(id, data);
}

export async function thematicsAll() {
  return await pb.collection('thematics').getFullList({ sort: 'nom' });
}

export async function thematicById(id) {
  return await pb.collection('thematics').getOne(id);
}

export async function signsDessinAll({ search = '' } = {}) {
  const filter = search ? `nom~"${search}"` : undefined;
  return await pb.collection('signs_dessin').getFullList({ filter, sort: 'nom' });
}

export async function signsDessinById(id) {
  return await pb.collection('signs_dessin').getOne(id);
}

export async function addSignDessin(data) {
  return await pb.collection('signs_dessin').create(data);
}

export async function updateSignDessin(id, data) {
  return await pb.collection('signs_dessin').update(id, data);
}

export async function lessonsAll() {
  return await pb.collection('mode_lecon').getFullList({ sort: 'titre', expand: 'relation' });
}

export async function lessonById(id) {
  return await pb.collection('mode_lecon').getOne(id, { expand: 'relation' });
}

export async function addLesson(data) {
  // data: { titre, relation: [signId, ...] }
  return await pb.collection('mode_lecon').create(data);
}

export async function updateLesson(id, data) {
  return await pb.collection('mode_lecon').update(id, data);
}

export async function gamesCardsAll() {
  return await pb.collection('jeux_cards').getFullList({ expand: 'relation' });
}

export async function gameCardsById(id) {
  return await pb.collection('jeux_cards').getOne(id, { expand: 'relation' });
}

export async function addGameCards(data) {
  return await pb.collection('jeux_cards').create(data);
}

export async function updateGameCards(id, data) {
  return await pb.collection('jeux_cards').update(id, data);
}

export async function gamesMemoryAll() {
  return await pb.collection('jeux_memory').getFullList({ sort: 'nom_niveau', expand: 'relation' });
}

export async function gameMemoryById(id) {
  return await pb.collection('jeux_memory').getOne(id, { expand: 'relation' });
}

export async function addGameMemory(data) {
  return await pb.collection('jeux_memory').create(data);
}

export async function updateGameMemory(id, data) {
  return await pb.collection('jeux_memory').update(id, data);
}

export async function gamesVraiFauxAll() {
  return await pb.collection('jeux_vrai_faux').getFullList({ expand: 'relation' });
}

export async function gameVraiFauxById(id) {
  return await pb.collection('jeux_vrai_faux').getOne(id, { expand: 'relation' });
}

export async function addGameVraiFaux(data) {
  return await pb.collection('jeux_vrai_faux').create(data);
}

export async function updateGameVraiFaux(id, data) {
  return await pb.collection('jeux_vrai_faux').update(id, data);
}

export async function scoresAll() {
  return await pb.collection('scores').getFullList({ sort: '-created', expand: 'user,game_type' });
}

export async function scoresByUser(userId) {
  return await pb.collection('scores').getFullList({
    filter: `user="${userId}"`,
    sort: '-created',
    expand: 'game_type',
  });
}

export async function addScore(data) {
  return await pb.collection('scores').create(data);
}

export async function supportMessagesAll() {
  return await pb.collection('support_messages').getFullList({ sort: '-created', expand: 'utilisateur' });
}

export async function supportMessagesByUser(userId) {
  return await pb.collection('support_messages').getFullList({
    filter: `utilisateur="${userId}"`,
    sort: '-created',
  });
}

export async function addSupportMessage(data) {
  return await pb.collection('support_messages').create(data);
}

export async function updateSupportMessage(id, data) {
  return await pb.collection('support_messages').update(id, data);
}

export async function userById(id) {
  return await pb.collection('utilisateurs').getOne(id);
}

export async function usersAll() {
  return await pb.collection('utilisateurs').getFullList({ sort: 'created' });
}

export async function addUser(data) {
  // data: { email, password, passwordConfirm, pseudo, username, ... }
  return await pb.collection('utilisateurs').create(data);
}

export async function userGamesByUser(userId) {
  return await pb.collection('user_games').getFullList({ filter: `user="${userId}"`, sort: 'date_session' });
}

function normalizeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

function getDailyKeys(records) {
  const set = new Set();
  for (const record of records) {
    const date = normalizeDate(record.date_session || record.created);
    if (date) {
      set.add(`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`);
    }
  }
  return [...set]
    .map((value) => {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(Date.UTC(year, month - 1, day));
    })
    .sort((a, b) => a.getTime() - b.getTime());
}

function computeMaxConsecutiveDays(dates) {
  if (!dates.length) return 0;
  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i += 1) {
    const previous = dates[i - 1].getTime();
    const current = dates[i].getTime();
    if (current === previous + 86400000) {
      currentStreak += 1;
    } else if (current !== previous) {
      currentStreak = 1;
    }
    maxStreak = Math.max(maxStreak, currentStreak);
  }

  return maxStreak;
}

export async function getUserProfileStats(userId) {
  const sessions = await userGamesByUser(userId);
  const lessonCount = sessions.length;
  const xpTotal = sessions.reduce((sum, session) => sum + (Number(session.xp_gagne) || 0), 0);
  const uniqueDates = getDailyKeys(sessions);
  const seriesCount = computeMaxConsecutiveDays(uniqueDates);

  return {
    sessions,
    lessonCount,
    xpTotal,
    seriesCount,
    serieUnlocked: seriesCount >= 14,
    lessonUnlocked: lessonCount >= 50,
    noviceUnlocked: seriesCount >= 14 && lessonCount >= 50,
  };
}

export async function login(email, password) {
  const auth = await pb.collection('utilisateurs').authWithPassword(email, password);
  return auth;
}

export async function registerUser({ email, password, passwordConfirm, pseudo, username }) {
  return await addUser({
    email,
    password,
    passwordConfirm,
    pseudo,
    username,
  });
}

export function logout() {
  pb.authStore.clear();
}
