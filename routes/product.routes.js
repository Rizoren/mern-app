const { Router } = require('express')
const Product = require('../models/Product')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/add', auth, async (req, res) => {
    try {
        const {name} = req.body

        const existing = await Product.findOne({ name })
        if (existing) {
            return res.json({ recipe: existing })
        }

        const product = new Product({
            name
        })

        await product.save()

        res.status(201).json({ product })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.delete(req.params.id)
        res.json(product)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
})

module.exports = router