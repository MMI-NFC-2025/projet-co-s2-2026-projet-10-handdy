/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3981798355")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1340419796",
    "help": "",
    "hidden": false,
    "id": "relation4277159965",
    "maxSelect": 10,
    "minSelect": 0,
    "name": "badge",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3981798355")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1340419796",
    "help": "",
    "hidden": false,
    "id": "relation4277159965",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "badge",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
