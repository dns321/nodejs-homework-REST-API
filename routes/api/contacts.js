const express = require("express");
const router = express.Router();
const { contactsCtrl: ctrl } = require("../controllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getOne);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.delet);

router.patch("/:contactId", ctrl.edit);

module.exports = router;
