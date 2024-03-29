const bcrypt = require("bcrypt"); //Pour hacher le mot de passe
const jwt = require("jsonwebtoken"); //Package pour attribuer un token à l'utilisateur quand il se connecte
const User = require("../models/user"); //Récupération du model

//Création d'un nouvel utilisateur et hash du mdp
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then (hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "utilisateur créé !"}))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

//Authentification de l'utilisateur
exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({message: 'Nom d\'utilisateur ou mot de passe incorrect'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: 'Nom d\'utilisateur ou mot de passe incorrect'})
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user.id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    })
                })
                .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}