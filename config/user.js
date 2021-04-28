const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const { igual, existe, naoExiste } = app.api.validation
    
    const encryptPassword = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
 }

 
 const save = async (req, res) => {
    const user = { ...req.body }
    if (req.params.id) user.id = req.params.id

    try {
        existe(user.nome, "Nome não informado!")
        existe(user.email, "E-mail não informado!")
        existe(user.senha, "Senha não informada!")
        existe(user.confirmeSenha, "Confirmação da senha não informada!")
        igual(user.senha, user.confirmeSenha, "Senhas não conferem!")

        if (!user.id) {
            const userDB = await app.db('users')
                .where({ email: user.email })
                .first()
            naoExiste(userDB, "Usuário já cadastrado!")
        } else {
            const userDB_ = await app.db('users')
                .where({ email: user.email, id: req.params.id})
                .first()
            if (!userDB_) {
                const userDB__ = await app.db('users')
                    .where({ email: user.email })
                    .first()
                naoExiste(userDB__, "Usuário já cadastrado!")
            }
        }
    } catch (msg) {
        return res.status(400).send(msg)
    }

    user.senha = encryptPassword(user.senha)
    delete user.confirmeSenha

    if (user.id) {
        app.db('users')
            .update(user)
            .where({ id: user.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } else {
        app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
}

const get = (req, res) => {
    app.db('users')
        .select('id', 'nome', 'email')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
}

const getById = (req, res) => {
    app.db('users')
        .select('id', 'nome', 'email')
        .where({ id: req.params.id })
        .first()
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
}

const remove = async (req, res) => {
    try {
        const user = await app.db('users')
            .delete()
            .where({ id: req.params.id })
        existe(user, "Usuário não foi encontrado!")

        res.status(204).send()
    } catch (msg) {
        res.status(400).send(msg)
    }
}

return { save, get, getById, remove }


}
