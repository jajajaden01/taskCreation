import Joi from 'joi';

class Validations {
  static userSignin(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(3).max(50).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(401).json({
        status: res.statusCode,
        error: error.details[0].message.replace(/"/g, ''),
      });
    } else next();
  }

  static validateTask(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      projectId: Joi.array().items(Joi.number()).required(),
      employeeId: Joi.array().items(Joi.number()),
      description: Joi.string().max(30).required(),
      priority: Joi.string().max(10),
      status: Joi.number(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
    });

    try {
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400).json({
          status: res.statusCode,
          error: error.details[0].message.replace(/"/g, ''),
        });
      } else next();
    } catch (err) {
      res.status(400).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }
}

export default Validations;
