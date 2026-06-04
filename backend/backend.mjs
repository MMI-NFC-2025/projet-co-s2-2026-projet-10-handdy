import PocketBase from 'pocketbase';

const pbUrl = 'https://wenddy.bambou-franceschini.fr';
const pb = new PocketBase(pbUrl);

export { pb };

export function getFileUrl(record, filename) {
  if (!record || !filename) return null;
  return `${pbUrl}/api/files/${record.collectionId}/${record.id}/${encodeURIComponent(filename)}`;
}

export async function badgesAll() {
  return await pb.collection('badges').getFullList({ sort: 'nom' });
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
  return await pb.collection('jeux_cards').getFullList({ 
    expand: 'relation,relation2' 
  });
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
  return await pb.collection('jeux_memory').getFullList({ 
    sort: 'nom_niveau', 
    expand: 'relation' // plus besoin du double expand
  });
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


export async function gameVraiFauxById(id) {
  return await pb.collection('jeux_vrai_faux').getOne(id, { expand: 'relation' });
}

export async function addGameVraiFaux(data) {
  return await pb.collection('jeux_vrai_faux').create(data);
}

export async function updateGameVraiFaux(id, data) {
  return await pb.collection('jeux_vrai_faux').update(id, data);
}

export async function gamesVraiFauxAll() {
  return await pb.collection('jeux_vrai_faux').getFullList({ 
    expand: 'relation'  // ← indispensable pour avoir la vidéo
  });
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

// Mise à jour du score après une bonne réponse
export async function updateScore(userId, pointsGagnes) {
  // 1. Récupérer le score actuel
  const record = await pb.collection('score').getFirstListItem(`user="${userId}"`);
  
  // 2. Calculer le nouveau streak (logique simple)
  const hier = new Date();
  hier.setDate(hier.getDate() - 1);
  
  const derniereDate = new Date(record.last_played_at);
  let nouveauStreak = record.streak;

  if (derniereDate.toDateString() === hier.toDateString()) {
    nouveauStreak += 1; // Joué hier, on continue la série
  } else if (derniereDate.toDateString() !== new Date().toDateString()) {
    nouveauStreak = 1; // Reprise après une pause
  }

  // 3. Update dans PocketBase
  return await pb.collection('score').update(record.id, {
    xp: record.xp + pointsGagnes,
    streak: nouveauStreak,
    last_played_at: new Date().toISOString()
  });
}

export async function supportMessagesAll() {
  return await pb.collection('support_messages').getFullList({ sort: '-created', expand: 'utilisateurs' });
}

export async function supportMessagesByUser(userId) {
  return await pb.collection('support_messages').getFullList({
    filter: `utilisateurs="${userId}"`,
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
  return await pb.collection('users').authWithPassword(email.trim(), password);
}

export async function registerUser({ email, password, passwordConfirm, pseudo, username }) {
  // On crée d'abord l'utilisateur dans 'users'
  const user = await pb.collection('users').create({ 
    email, 
    password, 
    passwordConfirm, 
    pseudo, 
    username 
  })

  try {
    await pb.collection('utilisateurs').create({
      id: user.id, // On utilise le même ID pour faire le lien
      xp_total: 0,
      niveau: 1,
      streak_count: 0
    });
  } catch (e) {
    console.error("Le profil a échoué mais l'utilisateur est créé :", e);
  }
  
  return user;
}

export function logout() {
  pb.authStore.clear();
}


export async function searchUsers(query, limit = 20) {
  const q = query.trim();
  
  const filter = [
    `pseudo~"${q}"`,
    `email~"${q}"`
  ].join(' || ');
  
  const userId = pb.authStore.model?.id || '';
  
  return await pb.collection('users').getList(1, limit, {
    filter: `(${filter}) && id != "${userId}"`,
    sort: 'created',
  });
}


export async function followUser(targetUserId) {
  const userId = pb.authStore.model?.id;
  if (!userId) throw new Error('Non authentifié.');
  
  return await pb.collection('follows').create({
    follower: userId,
    followed: targetUserId,
  }, { requestKey: null }); 
}

export async function unfollowUser(targetUserId) {
  const userId = pb.authStore.model?.id;
  if (!userId) throw new Error('Non authentifié.');
  
  const rec = await pb.collection('follows').getFirstListItem(
    `follower="${userId}" && followed="${targetUserId}"`, 
    { requestKey: null }
  );
  return await pb.collection('follows').delete(rec.id, { requestKey: null });
}

export async function getFollowCounts(userId) {
  const [follower, followed] = await Promise.all([
    pb.collection('follows').getFullList({ filter: `followed="${userId}"`, requestKey: null }),
    pb.collection('follows').getFullList({ filter: `follower="${userId}"`, requestKey: null }),
  ]);
  return { followers: follower.length, following: followed.length };
}

export async function isFollowing(targetUserId) {
  const userId = pb.authStore.model?.id;
  if (!userId) return false;
  
  try {
    await pb.collection('follows').getFirstListItem(
      `follower="${userId}" && followed="${targetUserId}"`, 
      { requestKey: null }
    );
    return true;
  } catch {
    return false;
  }
}

export function getCurrentUser() {
  return pb.authStore.model;
}

export function planifierRappelQuotidien(heure, minute) {
  setInterval(() => {
    const maintenant = new Date();
    if (maintenant.getHours() === heure && maintenant.getMinutes() === minute) {
      triggerNotification("Rappel Wenddy", "C'est l'heure de ta session du jour !");
    }
  }, 60000); // Vérifie toutes les minutes
}
        async function initAmisListener() {
        const currentUser = pb.authStore.model;
          if (!currentUser) return;

        // On récupère la liste des IDs des personnes suivies
        const follows = await pb.collection('follows').getFullList({
          filter: `follower="${currentUser.id}"`
        });
          const mesAmisIds = follows.map(f => f.followed);

            // 2. S'abonner aux changements dans la collection 'scores'
            pb.collection('scores').subscribe('*', (e) => {
              // Si c'est une création de score
              if (e.action === 'create') {
                const nouveauScore = e.record;

                // 3. Vérifier si l'auteur du score est un ami
                if (mesAmisIds.includes(nouveauScore.user)) {
                  triggerNotification(
                    "Succès de mes amis !", 
                    "Un de tes amis vient de terminer une leçon !"
                  );
                }
              }
            });
          }
  
  export async function enregistrerProgression(userId, xpGagnes) {
  // 1. Récupérer ou créer l'enregistrement de score pour l'utilisateur
  let score;
  try {
    score = await pb.collection('score').getFirstListItem(`user="${userId}"`);
  } catch (e) {
    score = await pb.collection('score').create({ user: userId, xp: 0, streak: 0, last_played_at: null });
  }

  const maintenant = new Date();
  const derniereDate = score.last_played_at ? new Date(score.last_played_at) : null;
  
  let nouveauStreak = score.streak;
  
  // Logique du streak
  if (derniereDate) {
    const diffJours = Math.floor((maintenant - derniereDate) / (1000 * 60 * 60 * 24));
    
    if (diffJours === 1) {
      nouveauStreak += 1; // Le joueur a joué hier, on incrémente
    } else if (diffJours > 1) {
      nouveauStreak = 1; // Le joueur a sauté un jour, on remet à 1
    }
    // Si diffJours === 0, on ne fait rien (il a déjà joué aujourd'hui)
  } else {
    nouveauStreak = 1; // Première fois qu'il joue
  }

  // 2. Mise à jour dans PocketBase
  return await pb.collection('score').update(score.id, {
    xp: score.xp + xpGagnes,
    streak: nouveauStreak,
    last_played_at: maintenant.toISOString()
  });
}


export async function ajouterSession(userId, xpGagnes) {
  // Crée une session dans user_games (pour les stats/séries)
  await pb.collection('user_games').create({
    user: userId,
    xp_gagne: xpGagnes,
    date_session: new Date().toISOString(),
  });
  // Met à jour le score global et le streak
  return await enregistrerProgression(userId, xpGagnes);
}