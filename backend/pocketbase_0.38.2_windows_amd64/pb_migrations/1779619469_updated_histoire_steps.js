/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_898819436")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "listRule": "",
    "name": "histoires_steps",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  // add field
  collection.fields.addAt(2, new Field({
    "help": "",
    "hidden": false,
    "id": "number1937347273",
    "max": null,
    "min": null,
    "name": "ordre",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "file3839279114",
    "maxSelect": 0,
    "maxSize": 0,
    "mimeTypes": null,
    "name": "video_lsf",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text849144196",
    "max": 0,
    "min": 0,
    "name": "transcription",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2874626212",
    "help": "",
    "hidden": false,
    "id": "relation3069659470",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "question",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3174733169",
    "help": "",
    "hidden": false,
    "id": "relation3948282936",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "histoire",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_898819436")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "name": "histoire_steps",
    "updateRule": null,
    "viewRule": null
  }, collection)

  // remove field
  collection.fields.removeById("number1937347273")

  // remove field
  collection.fields.removeById("file3839279114")

  // remove field
  collection.fields.removeById("text849144196")

  // remove field
  collection.fields.removeById("relation3069659470")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3174733169",
    "help": "",
    "hidden": false,
    "id": "relation3948282936",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "story",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
