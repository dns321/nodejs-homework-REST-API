const Joi = require("joi");
const { services } = require("../../services");

const getAll = async (_, res, next) => {
  try {
    const contacts = await services.getAll({});
    if (!contacts) {
      throw new Error();
    }

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

    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await services.findById(id);

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

    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { body } = req;
    const bodyShema = Joi.object({
      name: Joi.string().alphanum().required(),
      email: Joi.string().required(),
      phone: Joi.number().required(),
    });
    bodyShema.validateAsync(body);

    const contacts = await services.add(body);

    if (!contacts) {
      throw new Error();
    }

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contacts },
    });
  } catch (error) {
    error.code = 400;
    error.message = "missing required name field";

    next(error);
  }
};

const delet = async (req, res, next) => {
  try {
    const id = req.params;
    const contact = await services.remove(id);

    if (!contact) throw new Error();

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    error.code = 404;
    error.message = "contact not found";

    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const { body } = req;

    const bodyShema = Joi.object({
      name: Joi.string().alphanum(),
      email: Joi.string(),
      phone: Joi.number(),
    });
    bodyShema.validateAsync(body);

    const id = req.params;

    const options = {
      new: true,
    };

    const contact = await services.update(id, body, options);

    if (!contact) throw new Error();

    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    error.message = "Not found";
    error.code = 404;

    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const bodyShema = Joi.object({
      name: Joi.string().alphanum(),
      email: Joi.string(),
      phone: Joi.number(),
    });
    bodyShema.validateAsync(body);

    body.favorite = true;

    const options = {
      new: true,
    };

    const contact = await services.update(id, body, options);

    if (!contact) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    error.code = 404;
    error.message = "Not found";

    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  delet,
  edit,
  updateStatusContact,
};
