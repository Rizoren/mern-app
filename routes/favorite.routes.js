const { Router } = require('express')
const Favorite = require('../models/Favorite')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/:id', auth, async (req, res) => {
    try {
        const {newFavorite} = req.body

        const existing = await Favorite.findOne({owner: newFavorite.owner, product: newFavorite.product})
        if (existing) {
            return res.json({})
        }

        const favorite = new Favorite(newFavorite)

        await favorite.save()

        return res.status(200).json(favorite)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const favorite = await Favorite.find({owner: req.params.id})
        res.json(favorite)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.delete('/:id/:favId', auth, async (req, res) => {
    try {
        const favorite = await Favorite.deleteOne({_id: req.params.favId})
        res.json({})
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

module.exports = router