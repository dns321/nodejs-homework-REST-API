const express = require("express");
const router = express.Router();
const { contactsCtrl: ctrl } = require("../controllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getOne);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.delet);

router.patch("/:contactId", ctrl.edit);

router.edit("/:contactId/favorite", ctrl.updateStatusContact);

module.exports = router;
