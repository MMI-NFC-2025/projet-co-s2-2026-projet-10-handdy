// src/backend/notifications.js

// Initialise la demande de permission
export function initNotifications() {
  if (typeof window !== 'undefined' && "Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }
}

// Fonction pour envoyer l'alerte
export function triggerNotification(titre, corps) {
  if (typeof window === 'undefined' || !("Notification" in window)) return;

  const settings = JSON.parse(localStorage.getItem('wenddy_notif_settings') || '{}');
  
  // On vérifie : 1) Pas de désactivation globale, 2) Permission accordée
  if (settings.desactiverTout) return;
  if (Notification.permission !== "granted") return;

  // On vérifie si le type spécifique est activé
  if (titre.includes("Rappel") && settings.rappels === false) return;
  if (titre.includes("Amis") && settings.amis === false) return;

  new Notification(titre, {
    body: corps,
    icon: '/favicon.svg' 
  });
}

// src/backend/notifications.js

// ... garde tes fonctions existantes (triggerNotification, etc.) ...

export function planifierRappelQuotidien(heure, minute) {
  let lastNotifiedDate = null;

  setInterval(() => {
    const maintenant = new Date();
    
    // Vérifie si c'est l'heure cible
    if (maintenant.getHours() === heure && maintenant.getMinutes() === minute) {
      const aujourdhui = maintenant.toDateString();

      // Vérifie si on n'a pas déjà notifié aujourd'hui
      if (lastNotifiedDate !== aujourdhui) {
        // Appelle ta fonction existante
        triggerNotification("Rappel Wenddy", "C'est l'heure de ta session du jour !");
        
        // On marque qu'on a notifié pour aujourd'hui
        lastNotifiedDate = aujourdhui;
      }
    }
  }, 60000); // Vérifie toutes les 60 secondes
}