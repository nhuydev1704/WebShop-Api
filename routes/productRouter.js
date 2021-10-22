const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')

router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.createProduct)


router.route('/products/:id')
    .get(productCtrl.getOneProduct)
    .put(productCtrl.updateProduct)
    .patch(productCtrl.reviews)
    .delete(productCtrl.deleteProduct)


module.exports = router