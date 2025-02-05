/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3189772711")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number2254405824",
    "max": null,
    "min": null,
    "name": "duration",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4071527428",
    "max": 0,
    "min": 0,
    "name": "web_link",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3189772711")

  // remove field
  collection.fields.removeById("number2254405824")

  // remove field
  collection.fields.removeById("text4071527428")

  return app.save(collection)
})
