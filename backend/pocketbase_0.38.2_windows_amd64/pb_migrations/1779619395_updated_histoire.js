/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3174733169")

  // update collection data
  unmarshal({
    "name": "histoires"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3174733169")

  // update collection data
  unmarshal({
    "name": "histoire"
  }, collection)

  return app.save(collection)
})
