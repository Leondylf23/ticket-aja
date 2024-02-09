const Router = require('express').Router();

const ValidationTicket = require('../helpers/validationTicketHelper');
const TraverticketHelper = require('../helpers/ticketHelper');
const GeneralHelper = require('../helpers/generalHelper');
const AuthMiddleware = require('../middlewares/authMiddleware');
const MulterMiddleware = require('../middlewares/multerMiddleware');
const Boom = require('boom');

const fileName = 'server/api/travelticket.js';

// PRIVATE FUCNTIONS

// ROUTE FUNCTIONS
const allBookings = async (request, reply) => {
    try {
        ValidationTicket.allBookingValidation(request.query);

        const formData = request.query;
        const response = await TraverticketHelper.getAllBooking(formData);

        return reply.send({
            message: 'success',
            data: response
        });
    } catch (err) {
        console.log([fileName, 'All Bookings API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const getBookingDetail = async (request, reply) => {
    try {
        ValidationTicket.bookingDetailValidation(request.query);

        const { bookingId } = request.query;
        const response = await TraverticketHelper.getBookingDetailWithId({ bookingId });

        return reply.send({
            message: 'success',
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Booking Detail API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const allCoupons = async (request, reply) => {
    try {
        const userData = GeneralHelper.getUserData(request);
        if (!(userData?.role === 'business')) throw Boom.unauthorized('User role not allowed!');

        const response = await TraverticketHelper.getAllCoupons(userData?.userId);

        return reply.send({
            message: 'success',
            data: response
        });
    } catch (err) {
        console.log([fileName, 'All Coupons API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const allTickets = async (request, reply) => {
    try {
        ValidationTicket.allTicketsValidation(request.query);

        const formData = request.query;
        const response = await TraverticketHelper.getAllTickets(formData);

        return reply.send({
            message: 'success',
            data: response
        });
    } catch (err) {
        console.log([fileName, 'All Ticket API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const ticketDetail = async (request, reply) => {
    try {
        ValidationTicket.idValidation(request.query);

        const formData = request.query;
        const response = await TraverticketHelper.getTicketDetail(formData, null, false);

        return reply.send({
            message: 'success',
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Ticket Detail API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const allMyTickets = async (request, reply) => {
    try {
        ValidationTicket.allTicketsValidation(request.query);

        const userData = GeneralHelper.getUserData(request);
        const formData = request.query;
        const response = await TraverticketHelper.getAllTickets(formData, userData?.role === 'business' ? userData?.userId : null);

        return reply.send({
            message: 'success',
            data: response
        });
    } catch (err) {
        console.log([fileName, 'All My Ticket API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const myTicketDetail = async (request, reply) => {
    try {
        ValidationTicket.idValidation(request.query);

        const userData = GeneralHelper.getUserData(request);
        const formData = request.query;
        const response = await TraverticketHelper.getTicketDetail(formData, userData?.userId, true);

        return reply.send({
            message: 'success',
            data: response
        });
    } catch (err) {
        console.log([fileName, 'My Ticket Detail API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const createTicket = async (request, reply) => {
    try {
        ValidationTicket.ticketFormValidation(request.body);

        const userData = GeneralHelper.getUserData(request);
        if (!(userData?.role === 'business')) throw Boom.unauthorized('User role not allowed!');

        const imageFile = request?.files?.imageData;
        if (!imageFile) throw Boom.badRequest('Image file required!');

        const formData = request.body;
        const response = await TraverticketHelper.addTicket({ ...formData, imageData: imageFile[0] }, userData?.userId);

        return reply.send({
            message: "success",
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Create Ticket API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const createBooking = async (request, reply) => {
    try {
        ValidationTicket.bookingDataFormValidation(request.body);

        const userData = GeneralHelper.getUserData(request);
        const formData = request.body;
        const response = await TraverticketHelper.addBooking(formData, userData?.userId);

        return reply.send({
            message: "success",
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Create Booking API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const createCoupon = async (request, reply) => {
    try {
        ValidationTicket.couponDataFormValidation(request.body);

        const userData = GeneralHelper.getUserData(request);
        if (!(userData?.role === 'business')) throw Boom.unauthorized('User role not allowed!');
        
        const formData = request.body;
        const response = await TraverticketHelper.addCoupon(formData, userData?.userId);

        return reply.send({
            message: "success",
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Create Coupon API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const editTicket = async (request, reply) => {
    try {
        ValidationTicket.editTicketFormValidation(request.body);

        const userData = GeneralHelper.getUserData(request);
        if (!(userData?.role === 'business')) throw Boom.unauthorized('User role not allowed!');

        const imageFile = request?.files?.imageData;

        const formData = request.body;
        const response = await TraverticketHelper.editTicketData({...formData, imageData: Array.isArray(imageFile) ? imageFile[0] : null}, userData?.userId);

        return reply.send({
            message: "success",
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Edit Ticket Data API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const editCoupon = async (request, reply) => {
    try {
        ValidationTicket.editCouponFormValidation(request.body);

        const userData = GeneralHelper.getUserData(request);
        const formData = request.body;
        const response = await TraverticketHelper.editCouponData(formData, userData?.userId);

        return reply.send({
            message: "success",
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Edit Coupon Data API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const deleteTicket = async (request, reply) => {
    try {
        ValidationTicket.idValidation(request.body);

        const userData = GeneralHelper.getUserData(request);
        if (!(userData?.role === 'business')) throw Boom.unauthorized('User role not allowed!');

        const formData = request.body;
        const response = await TraverticketHelper.deleteTicket(formData, userData?.userId);

        return reply.send({
            message: "success",
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Delete Ticket Data API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

const deleteCoupon = async (request, reply) => {
    try {
        ValidationTicket.idValidation(request.body);

        const userData = GeneralHelper.getUserData(request);
        const formData = request.body;
        const response = await TraverticketHelper.deleteCoupons(formData, userData?.userId);

        return reply.send({
            message: "success",
            data: response
        });
    } catch (err) {
        console.log([fileName, 'Delete Coupon Data API', 'ERROR'], { info: `${err}` });
        return reply.send(GeneralHelper.errorResponse(err));
    }
};

Router.get('/booking', allBookings);
Router.get('/booking/detail', getBookingDetail);
Router.get('/coupon', AuthMiddleware.validateToken, allCoupons);
Router.get('/ticket', allTickets);
Router.get('/ticket/detail', ticketDetail);

Router.get('/ticket/mytickets', AuthMiddleware.validateToken, allMyTickets);
Router.get('/ticket/mytickets/detail', AuthMiddleware.validateToken, myTicketDetail);

Router.post('/booking/create', AuthMiddleware.validateToken, createBooking);
Router.post('/coupon/create', AuthMiddleware.validateToken, createCoupon);

Router.put('/ticket/create', AuthMiddleware.validateToken, MulterMiddleware.fields([{ name: 'imageData', maxCount: 1 }]), createTicket);

Router.patch('/ticket/edit', AuthMiddleware.validateToken, MulterMiddleware.fields([{ name: 'imageData', maxCount: 1 }]), editTicket);
Router.patch('/coupon/edit', AuthMiddleware.validateToken, editCoupon);

Router.delete('/ticket/delete', AuthMiddleware.validateToken, deleteTicket);
Router.delete('/coupon/delete', AuthMiddleware.validateToken, deleteCoupon);

module.exports = Router;
