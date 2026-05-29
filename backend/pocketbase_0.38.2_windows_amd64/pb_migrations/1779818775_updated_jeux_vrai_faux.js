/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2232072230")

  // update field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "select1274211008",
    "maxSelect": 0,
    "name": "select",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "À bientôt",
      " Aimer quelque chose",
      "    Ami",
      "    Aujourd'hui",
      "    Au revoir",
      "    Avoir",
      "    Bisous",
      "    Boire",
      "    Bonjour",
      "    Bonsoir",
      "    Comment",
      "    Comprendre",
      "    Demain",
      "    Dormir",
      "    Être",
      "    Femme",
      "    Frère",
      "    Hier",
      "    Homme",
      "    Ils",
      "    Je ne comprends pas",
      "    Lentement",
      "    Malentendant",
      "    Maman",
      "    Manger",
      "    Merci",
      "    Moi",
      "    Ne pas comprendre",
      "    Non",
      "    Nous",
      "    Où",
      "    Oui",
      "    Papa",
      "    Pardon",
      "    Pourquoi",
      "    Qui",
      "    Répéter",
      "    S'il vous plaît",
      "    Signer",
      "    Sœur",
      "    Sourd",
      "    Toi",
      "    Travailler",
      "    Vous"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2232072230")

  // update field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "select1274211008",
    "maxSelect": 0,
    "name": "select",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "vrai",
      "faux"
    ]
  }))

  return app.save(collection)
})
