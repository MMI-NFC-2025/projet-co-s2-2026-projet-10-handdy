/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_518223192")

  // add field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "date3140324106",
    "max": "",
    "min": "",
    "name": "derniere_activite",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "number2841744435",
    "max": null,
    "min": null,
    "name": "streak_count",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "number2322332954",
    "max": null,
    "min": null,
    "name": "total_learning_time",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "bool3938307507",
    "name": "mode_tortue",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_518223192")

  // remove field
  collection.fields.removeById("date3140324106")

  // remove field
  collection.fields.removeById("number2841744435")

  // remove field
  collection.fields.removeById("number2322332954")

  // remove field
  collection.fields.removeById("bool3938307507")

  return app.save(collection)
})
