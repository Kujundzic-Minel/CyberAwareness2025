/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_93315167")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text724990059",
    "max": 0,
    "min": 0,
    "name": "title",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file3309110367",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "image",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json97424953",
    "maxSize": 0,
    "name": "choices",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2718152672",
    "max": 0,
    "min": 0,
    "name": "correct_answer",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text885392211",
    "max": 0,
    "min": 0,
    "name": "hint",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_575754128",
    "hidden": false,
    "id": "relation2541086472",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "theme",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number666537513",
    "max": null,
    "min": null,
    "name": "points",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_93315167")

  // remove field
  collection.fields.removeById("text724990059")

  // remove field
  collection.fields.removeById("file3309110367")

  // remove field
  collection.fields.removeById("json97424953")

  // remove field
  collection.fields.removeById("text2718152672")

  // remove field
  collection.fields.removeById("text885392211")

  // remove field
  collection.fields.removeById("relation2541086472")

  // remove field
  collection.fields.removeById("number666537513")

  return app.save(collection)
})
