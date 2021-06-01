const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");

const getAll = async (_, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    error.message = "Not found";
    error.code = 404;

    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(Number(id));

    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    error.message = "Not found";
    error.code = 404;

    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const all = contacts.length;
    const { body } = req;
    const newContact = {
      id: all + 1,
      ...body,
    };

    addContact(newContact);

    res.status(201).json({
      status: "success",
      code: 201,
      data: { newContact },
    });
  } catch (error) {
    error.code = 400;
    error.message = "required field";

    next(err);
  }
};

const delet = async (req, res, next) => {
  try {
    const id = Number(req.params.contactId);
    const contact = await getContactById(id);

    if (!contact) throw new Error();
    removeContact(id);

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    error.code = 404;
    error.message = "contact not found";

    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const id = Number(req.params.contactId);
    const contact = await getContactById(id);

    if (!contact) throw new Error();
    const newContact = { ...contact, ...req.body };
    updateContact(id, newContact);

    res.json({
      status: "success",
      code: 200,
      data: { newContact },
    });
  } catch (error) {
    error.message = "Not found";
    error.code = 404;

    next(err);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  delet,
  edit,
};
