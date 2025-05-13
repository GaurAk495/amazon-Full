import Joi from 'joi'

const signupSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one lowercase, one uppercase, one number and one special character'
        })
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

export { validateSignup, validateLogin }