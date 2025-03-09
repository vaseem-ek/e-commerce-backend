const express=require('express')
const usersController=require('../controllers/userController')
const productCotroller=require('../controllers/productController')
const multer=require('../middlewares/multer')
const jwtMiddle=require('../middlewares/jwtMiddle')
const cartController=require('../controllers/cartController')
const orderController=require('../controllers/orderController')
const heroController=require('../controllers/heroController')


const router=express.Router()

router.post('/register',usersController.registerUser)
router.post('/login',usersController.loginUser)
router.get('/allUsers',usersController.AllUsers)

router.post('/add-product',jwtMiddle,multer.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),productCotroller.addProduct)
router.get('/list-product',productCotroller.listProduct)
router.delete('/remove-product/:sid',jwtMiddle,productCotroller.removeProduct)
router.get('/single-product/:sid',productCotroller.singleProduct)

router.post('/add-cart',jwtMiddle,cartController.addCart)
router.get('/get-cart',jwtMiddle,cartController.getCart)
router.post('/update-cart',jwtMiddle,cartController.updateCart)


router.get('/list',jwtMiddle,orderController.allOrders)
router.post('/status',jwtMiddle,orderController.updateStatus)

router.post('/place',jwtMiddle,orderController.placeOrder)
router.post('/stripe',jwtMiddle,orderController.placeOrderStripe)
router.post('/razorpay',jwtMiddle,orderController.placeOrderRazorepay)
router.get('/userorders',jwtMiddle,orderController.orderUser)
router.post('/verify',jwtMiddle,orderController.verifyStripe)
router.delete('/orders/:sid',jwtMiddle,orderController.deleteOrder)

router.post('/addHero',multer.single('picture'),heroController.addHero)


module.exports=router