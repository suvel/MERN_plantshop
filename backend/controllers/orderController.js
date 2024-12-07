const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

// Global Variables for Dashboard Logic
let totalAmount = 0; // Total revenue from all orders
let cashOnDeliveryAmount = 0; // Total collected via COD

// Create New Order - api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;

    // Update stock for ordered items
    for (let item of orderItems) {
        await updateStock(item.product, -item.quantity);
    }

    // Increase total revenue (not COD yet, only order total)
    totalAmount += totalPrice;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// Get Single Order - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Get Logged-in User Orders - /api/v1/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders,
    });
});

// Admin: Get All Orders - api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    res.status(200).json({
        success: true,
        totalAmount,
        cashOnDeliveryAmount,
        orders,
    });
});

// Admin: Update Order / Order Status - api/v1/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order has already been delivered!', 400));
    }

    if (req.body.orderStatus === 'Delivered') {
        order.orderItems.forEach(async (item) => {
            await updateStock(item.product, -item.quantity); // Deduct stock
        });

        if (order.paymentInfo.method === 'Cash on Delivery') {
            cashOnDeliveryAmount += order.totalPrice; // Update COD amount only after delivery
        }

        order.paymentInfo.status = 'Paid';
        order.deliveredAt = Date.now();
    }

    order.orderStatus = req.body.orderStatus;
    await order.save();

    res.status(200).json({
        success: true,
    });
});

// Cancel Order - api/v1/order/cancel/:id
exports.cancelOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Delivered orders cannot be cancelled.', 400));
    }

    // Restore stock and adjust totalAmount
    for (let item of order.orderItems) {
        await updateStock(item.product, item.quantity); // Add back stock
    }

    totalAmount -= order.totalPrice; // Deduct from total revenue

    order.orderStatus = 'Cancelled';

    if (order.paymentInfo.status === 'succeeded') {
        order.paymentInfo.status = 'Refund Processed'; // Refund for online payment
    } else {
        order.paymentInfo.status = 'Cancelled'; // Mark COD as cancelled
    }

    await order.save();

    res.status(200).json({
        success: true,
        message: 'Order has been cancelled successfully.',
        order,
    });
});

// Admin: Delete Order - api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404));
    }

    // Restore stock and adjust totalAmount
    // for (let item of order.orderItems) {
    //     await updateStock(item.product, item.quantity);
    // }

    // totalAmount -= order.totalPrice; // Deduct from total revenue

    await order.remove();

    res.status(200).json({
        success: true,
        message: 'Order has been deleted successfully.',
    });
});

// Helper function: Update stock
async function updateStock(productId, quantityChange) {
    const product = await Product.findById(productId);

    if (!product) {
        throw new ErrorHandler('Product not found', 404);
    }

    product.stock += quantityChange;

    if (product.stock < 0) {
        product.stock = 0;
    }

    await product.save({ validateBeforeSave: false });
}
