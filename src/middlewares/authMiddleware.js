const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: 'Não autorizado' })

    const parts = authHeader.split(' ')
    if (!parts.length === 2)
        return res.status(401).json({ error: 'Erro de token' })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: 'Token formatado incorretamente' })

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Sessão inválida' })

        req.userId = decoded.id
        return next()
    })
}
