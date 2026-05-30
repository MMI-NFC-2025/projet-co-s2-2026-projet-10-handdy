import {
  // Badges
  badgesAll, badgeById, addBadge, updateBadge,
  // Signs
  signsAll, signById, addSign, updateSign,
  // Thematics
  thematicsAll, thematicById,
  // Game types
  gameTypesAll, gameTypeById, addGameType, updateGameType,
  // Lessons
  lessonsAll, lessonById, addLesson, updateLesson,
  // Jeux: Cards / Memory / Vrai-Faux
  gamesCardsAll, gameCardsById, addGameCards, updateGameCards,
  gamesMemoryAll, gameMemoryById, addGameMemory, updateGameMemory,
  gamesVraiFauxAll, gameVraiFauxById, addGameVraiFaux, updateGameVraiFaux,
  // Scores
  scoresAll, scoresByUser, addScore,
  // Support
  supportMessagesAll, supportMessagesByUser, addSupportMessage, updateSupportMessage,
  // Users
  usersAll, userById, login, logout,
  // Helper
  getFileUrl
} from './backend.mjs';

// Tous les badges (tri par nom)

try {
  const records = await badgesAll();
  console.log(JSON.stringify(records, null, 2));
} catch (e) {
  console.error(e);
}


// Badge par ID
/*
try {
  const record = await badgeById('REPLACE_BADGE_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

// Ajouter un badge (image = File à envoyer côté formData en général)
/*
try {
  const data = { nom: 'Débutant' };
  const record = await addBadge(data);
  console.log('Badge ajouté:', record.id);
} catch (e) {
  console.error(e);
}
*/

// Mettre à jour un badge
/*
try {
  const record = await updateBadge('REPLACE_BADGE_ID', { nom: 'Intermédiaire' });
  console.log('Badge maj:', record.id);
} catch (e) {
  console.error(e);
}
*/

/* ===========================
   Signs (LSF) + Thematics
=========================== */

// Tous les signs, avec recherche éventuelle et filtre thématique
/*
try {
  const records = await signsAll({ search: 'aimer', thematicId: '' });
  console.log('Signs trouvés:', records.length);
  // Exemple d’URL de miniature si présente:
  if (records[0]?.miniature) {
    console.log('Miniature URL:', getFileUrl(records[0], records[0].miniature));
  }
} catch (e) {
  console.error(e);
}
*/

// Sign par ID
/*
try {
  const record = await signById('REPLACE_SIGN_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

// Ajouter un sign (sans fichiers ici)
/*
try {
  const data = {
    nom: 'Bonjour',
    description: 'Salutation simple',
    thematic: 'REPLACE_THEMATIC_ID'
  };
  const record = await addSign(data);
  console.log('Sign ajouté:', record.id);
} catch (e) {
  console.error(e);
}
*/

// Mettre à jour un sign
/*
try {
  const record = await updateSign('REPLACE_SIGN_ID', { description: 'Salutation polie' });
  console.log('Sign maj:', record.id);
} catch (e) {
  console.error(e);
}
*/

// Liste des thématiques
/*
try {
  const records = await thematicsAll();
  console.log('Thématiques:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Thématique par ID
/*
try {
  const record = await thematicById('REPLACE_THEMATIC_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

/* ===========================
   Game types
=========================== */

// Tous les types de jeu
/*
try {
  const records = await gameTypesAll();
  console.log('Game types:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Type de jeu par ID
/*
try {
  const record = await gameTypeById('REPLACE_GAME_TYPE_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

// Ajouter un type de jeu
/*
try {
  const data = { nom: 'Vrai/Faux', description: 'Question binaire sur un signe' };
  const record = await addGameType(data);
  console.log('Type de jeu ajouté:', record.id);
} catch (e) {
  console.error(e);
}
*/

// Mettre à jour un type de jeu
/*
try {
  const record = await updateGameType('REPLACE_GAME_TYPE_ID', { description: 'QCM booléen' });
  console.log('Type de jeu maj:', record.id);
} catch (e) {
  console.error(e);
}
*/

/* ===========================
   Lessons (mode_lecon)
=========================== */

// Toutes les leçons
/*
try {
  const records = await lessonsAll();
  console.log('Leçons:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Leçon par ID
/*
try {
  const record = await lessonById('REPLACE_LESSON_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

// Ajouter une leçon
/*
try {
  const data = { titre: 'Bases', relation: ['REPLACE_SIGN_ID_1', 'REPLACE_SIGN_ID_2'] };
  const record = await addLesson(data);
  console.log('Leçon ajoutée:', record.id);
} catch (e) {
  console.error(e);
}
*/

// Mettre à jour une leçon
/*
try {
  const record = await updateLesson('REPLACE_LESSON_ID', { titre: 'Bases LSF' });
  console.log('Leçon maj:', record.id);
} catch (e) {
  console.error(e);
}
*/

/* ===========================
   Jeux: Cards / Memory / Vrai-Faux
=========================== */

// Cards: toutes
/*
try {
  const records = await gamesCardsAll();
  console.log('Cards sets:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Cards: par ID
/*
try {
  const record = await gameCardsById('REPLACE_CARDS_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

// Cards: ajouter
/*
try {
  const data = { relation: ['REPLACE_SIGN_ID_1', 'REPLACE_SIGN_ID_2'] };
  const record = await addGameCards(data);
  console.log('Cards set ajouté:', record.id);
} catch (e) {
  console.error(e);
}
*/

// Memory: toutes
/*
try {
  const records = await gamesMemoryAll();
  console.log('Memory niveaux:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Memory: par ID
/*
try {
  const record = await gameMemoryById('REPLACE_MEMORY_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

// Memory: ajouter
/*
try {
  const data = { nom_niveau: 'Niveau 1', relation: 'REPLACE_SIGN_DESSIN_ID' };
  const record = await addGameMemory(data);
  console.log('Memory ajouté:', record.id);
} catch (e) {
  console.error(e);
}
*/

// Vrai/Faux: tous
/*
try {
  const records = await gamesVraiFauxAll();
  console.log('Vrai/Faux:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Vrai/Faux: par ID
/*
try {
  const record = await gameVraiFauxById('REPLACE_VRAI_FAUX_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

// Vrai/Faux: ajouter
/*
try {
  const data = {
    questions: 'Le signe “À bientôt” correspond-il à ce geste ?',
    relation: 'REPLACE_SIGN_ID',
    select: 'À bientôt',
    bool: true
  };
  const record = await addGameVraiFaux(data);
  console.log('Vrai/Faux ajouté:', record.id);
} catch (e) {
  console.error(e);
}
*/

/* ===========================
   Scores
=========================== */

// Tous les scores (avec expand user, game_type)
/*
try {
  const records = await scoresAll();
  console.log('Scores:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Scores par user
/*
try {
  const records = await scoresByUser('REPLACE_USER_ID');
  console.log('Scores user:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Ajouter un score
/*
try {
  const data = { user: 'REPLACE_USER_ID', game_type: 'REPLACE_GAME_TYPE_ID', points: 120, duration: 90 };
  const record = await addScore(data);
  console.log('Score ajouté:', record.id);
} catch (e) {
  console.error(e);
}
*/

/* ===========================
   Support messages
=========================== */

// Tous les messages de support
/*
try {
  const records = await supportMessagesAll();
  console.log('Support messages:', records.length);
} catch (e) {
  console.error(e);
}
*/

// Messages de support d’un user
/*
try {
  const records = await supportMessagesByUser('REPLACE_USER_ID');
  console.log('Support messages (user):', records.length);
} catch (e) {
  console.error(e);
}
*/

// Ajouter un message de support
/*
try {
  const data = { utilisateur: 'REPLACE_USER_ID', objet: 'Bug', message: 'La vidéo ne se lance pas.', statut: 'Ouvert' };
  const record = await addSupportMessage(data);
  console.log('Support ajouté:', record.id);
} catch (e) {
  console.error(e);
}
*/

// Mettre à jour un message de support
/*
try {
  const record = await updateSupportMessage('REPLACE_SUPPORT_ID', { statut: 'En cours' });
  console.log('Support maj:', record.id);
} catch (e) {
  console.error(e);
}
*/

/* ===========================
   Users (collection système)
=========================== */

// Tous les users
/*
try {
  const records = await usersAll();
  console.log('Users:', records.length);
} catch (e) {
  console.error(e);
}
*/

// User par ID
/*
try {
  const record = await userById('REPLACE_USER_ID');
  console.log(JSON.stringify(record, null, 2));
} catch (e) {
  console.error(e);
}
*/

// Login / Logout (si un user système existe)
/*
try {
  const auth = await login('email@example.com', 'motdepasse');
  console.log('Connecté en tant que:', auth?.record?.email);
  logout();
} catch (e) {
  console.error(e);
}
*/

