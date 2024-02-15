const catchError = require('../utils/catch-error')
const createError = require('../utils/create-error')
const publicService = require('../services/public-service')

exports.createOrder = catchError(async(req,res,next)=> {
    
})
exports.deleteOrder = catchError(async(req,res,next)=> {

})

exports.getProduct = catchError(async(req,res,next)=> {
const product = await publicService.getProduct()
res.status(200).json({product})
})