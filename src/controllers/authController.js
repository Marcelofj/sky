const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateToken = (params = {}) =>
    jwt.sign(params, process.env.SECRET, {
        expiresIn: '30m',
    })

module.exports.register = async (req, res) => {
    const { email } = req.body

    try {
        if (await User.findOne({ email }))
            return res.status(400).json({ error: 'E-mail já existente' })

        const user = await User.create(req.body)

        user.name = undefined
        user.email = undefined
        user.password = undefined
        user.phones = undefined

        return res.status(201).json({
            user,
            token: generateToken({ id: user.id }),
            loginAt: user.createdAt
        })
    } catch (err) {
        return res.status(400).json({ error: 'Falha ao registrar' })
    }
}

module.exports.authenticate = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res
                .status(401)
                .json({ error: 'Usuário e/ou senha inválidos' })
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res
                .status(401)
                .json({ error: 'Usuário e/ou senha inválidos' })
        }

        user.name = undefined
        user.email = undefined
        user.password = undefined
        user.phones = undefined

        const token = generateToken({ id: user.id })

        let loginDateUpdate = new Date().toISOString()

        return res.status(200).json({ user, token, loginAt: loginDateUpdate })
    } catch (err) {
        return res.status(400).json({ error: 'Falha ao autenticar' })
    }
}
