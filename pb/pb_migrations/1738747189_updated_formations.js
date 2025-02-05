/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3189772711")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "bool1815899509",
    "name": "certification",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3189772711")

  // remove field
  collection.fields.removeById("bool1815899509")

  return app.save(collection)
})
