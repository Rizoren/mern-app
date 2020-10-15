const { Router } = require('express')
const Recipe = require('../models/Recipe')
const Favorite = require('../models/Favorite')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/', auth, async (req, res) => {
    try {
        const {recipe} = req.body

        const existing = await Recipe.findOne({ name: recipe.name })
        if (existing) {
            return res.json({ recipe: existing })
        }

        const newRecipe = new Recipe(recipe)

        await newRecipe.save()

        res.status(201).json({ newRecipe })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const recipe = await Recipe.find()

        res.json(recipe)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.post('/:id', auth, async (req, res) => {
    try {
        const {recipe} = req.body

        const updRecipe = await Recipe.findOneAndUpdate({_id: req.params.id}, recipe, {
            new: true,
            upsert: true
        });

        return res.status(200).json({})
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.json(recipe)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.delete(req.params.id)
        res.json(recipe)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.get('/:id/recommendations', auth, async (req, res) => {
    try {
        const favorite = await Favorite.find({owner: req.params.id, relationship: 1})
        const recipes = await Recipe.find({ "ingredients.product": { $in: favorite.map(f => f.product) } })
        res.json(recipes)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

module.exports = router