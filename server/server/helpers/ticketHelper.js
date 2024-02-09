const _ = require('lodash');
const Boom = require('boom');
const { like } = require('sequelize/lib/operators');

const db = require('../../models');
const GeneralHelper = require('./generalHelper');
const { uploadToCloudinary } = require('../services/cloudinary');
const { encryptData } = require('./utilsHelper');

// PRIVATE FUNCTIONS

// TICKET HELPERS FUNCTIONS
const getAllBooking = async (dataObject) => {
    const { bookingType, customerName } = dataObject;

    try {
        const data = await db.booking.findAll({
            include: [
                {
                    association: 'customer',
                    required: true,
                    where: {
                        is_active: true,
                        ...(customerName && { customer_name: { [like]: `%${customerName}%` } })
                    },
                    attributes: ['customer_name']
                },
                {
                    association: 'coupon_connectors',
                    required: false,
                    where: { is_active: true },
                    attributes: ['id'],
                    include: [
                        {
                            association: 'coupon',
                            required: true,
                            where: { is_active: true },
                            attributes: ['coupon_name', 'coupon_prc_cut']
                        }
                    ]
                },
            ],
            where: {
                is_active: true,
                ...(bookingType && { booking_type: bookingType })
            },
            attributes: { exclude: ['is_active', 'customer_id'] }
        });

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const getBookingDetailWithId = async (dataObject) => {
    try {
        const data = await db.booking.findOne({
            include: [
                {
                    association: 'customer',
                    required: true,
                    where: { is_active: true },
                    attributes: ['customer_name']
                },
                {
                    association: 'coupon_connectors',
                    required: false,
                    where: { is_active: true },
                    attributes: ['id'],
                    include: [
                        {
                            association: 'coupon',
                            required: true,
                            where: { is_active: true },
                            attributes: ['coupon_name', 'coupon_prc_cut']
                        }
                    ]
                },
            ],
            attributes: { exclude: ['is_active', 'customer_id'] },
            where: { id: dataObject?.bookingId, is_active: true },
        });

        if (_.isEmpty(data)) throw Boom.notFound('Booking detail is not found!');

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const getAllTickets = async (dataObject, userId) => {
    try {
        const { ticketName } = dataObject;

        const data = await db.ticket.findAll({
            include: [
                {
                    association: 'user',
                    required: true,
                    where: { is_active: true },
                    attributes: [['fullname', 'organization']]
                },
            ],
            where: {
                isActive: true,
                ...(ticketName && { title: { [like]: `%${ticketName}%` } }),
                ...(userId && { createdBy: userId })
            },
            attributes: ['id', 'imageUrl', 'location', 'title', 'price', 'variants']
        });

        const remapData = data?.map(ticket => {
            const ticketValues = ticket?.dataValues;
            const variantsObj = JSON.parse(ticketValues?.variants);

            return ({
                organization: ticket?.user?.dataValues?.organization,
                ...ticketValues,
                variants: variantsObj.map(variant => variant?.variantName),
                user: undefined
            });
        });

        return Promise.resolve(remapData);
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const getTicketDetail = async (dataObject, userId, isBusiness) => {
    try {
        const { id } = dataObject;

        const data = await db.ticket.findOne({
            ...(!isBusiness && {
                include: [
                    {
                        association: 'user',
                        required: true,
                        where: { is_active: true },
                        attributes: [['fullname', 'organization']]
                    },
                ],
            }),
            where: {
                isActive: true,
                id
            },
            attributes: { exclude: ['id', 'isActive', 'createdAt', 'updatedAt'] }
        });

        const remapData = {
            ...data?.dataValues,
            createdBy: undefined,
            ...(!isBusiness && {organization: data?.user?.dataValues?.organization})
        }

        if (isBusiness && data?.dataValues?.createdBy !== userId) throw Boom.badData('Cannot access other user data!');

        return Promise.resolve(remapData);
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const getAllCoupons = async (userId) => {
    try {
        const data = await db.coupon.findAll({
            where: {
                is_active: true,
                createdBy: userId
            },
            attributes: [['coupon_name', 'name'], ['coupon_prc_cut', 'priceCut'], 'id']
        });

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const getAllCouponsByTicketId = async (dataObject) => {
    const { id } = dataObject;

    try {
        const data = await db.coupon.findOne({
            where: {
                is_active: true,
                createdBy: userId
            },
            attributes: { exclude: ['is_active'] }
        });

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const addTicket = async (dataObject, userId) => {
    try {
        const { title, location, variants, description, imageData } = dataObject;

        const imageResult = await uploadToCloudinary(imageData, 'image');
        const firstVariantPrice = JSON.parse(variants)[0]?.price;

        const data = await db.ticket.create({ title, price: firstVariantPrice, location, variants, description, imageUrl: imageResult.url, createdBy: userId });

        const remapData = {
            ...data?.dataValues,
            createdBy: undefined,
            createdAt: undefined,
            isActive: undefined,
            id: undefined,
        }

        return Promise.resolve({
            createdId: data?.id,
            createdData: remapData
        });
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const addBooking = async (dataObject, userId) => {
    try {
        const { customerId, type, price } = dataObject;

        const checkCustomerId = await db.customer.findOne({
            where: { id: customerId, is_active: true }
        });
        if (_.isEmpty(checkCustomerId)) throw Boom.notFound("Customer not found from this id!")

        const data = await db.booking.create({ customer_id: customerId, booking_type: type, booking_price: price, createdBy: userId });

        return Promise.resolve({
            createdId: data?.id,
            createdData: data
        });
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const addCoupon = async (dataObject, userId) => {
    try {
        const { name, priceCut } = dataObject;

        const data = await db.coupon.create({ coupon_name: name, coupon_prc_cut: priceCut, createdBy: userId });

        return Promise.resolve({
            createdId: data?.id,
            createdData: data
        });
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const editTicketData = async (dataObject, userId) => {
    try {
        const { id, title, location, variants, description, imageData } = dataObject;

        const data = await db.ticket.findOne({
            where: { id, isActive: true }
        });
        if (_.isEmpty(data)) throw Boom.notFound('Ticket not found!');

        const userIdCheck = data?.dataValues?.createdBy;
        if (userIdCheck !== userId) throw Boom.unauthorized('Your user account does not allowed to modify other user data!');

        let imageResult = null;
        if (imageData) imageResult = await uploadToCloudinary(imageData, 'image');

        const firstVariantPrice = JSON.parse(variants)[0]?.price;

        await data.update({ title, price: firstVariantPrice, location, variants, description, ...(imageResult && { imageUrl: imageResult?.url }) });

        const remapData = {
            ...data?.dataValues,
            createdBy: undefined,
            createdAt: undefined,
            isActive: undefined,
            id: undefined,
        }

        return Promise.resolve({
            updatedId: data?.id,
            updatedData: remapData
        });
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const editCouponData = async (dataObject, userId) => {
    try {
        const { id, name, priceCut } = dataObject;

        const data = await db.coupon.findOne({
            where: { id, is_active: true }
        });
        if (_.isEmpty(data)) throw Boom.notFound('Coupon not found!');

        const userIdCheck = data?.dataValues?.createdBy;
        if (userIdCheck !== userId) throw Boom.unauthorized('Your user account does not allowed to modify other user data!');

        await data.update({ coupon_name: name, coupon_prc_cut: priceCut });

        return Promise.resolve({
            updatedId: data?.id,
            updatedData: data
        });
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const deleteTicket = async (dataObject, userId) => {
    try {
        const { id } = dataObject;

        const data = await db.ticket.findOne({
            where: { id, isActive: true }
        });
        if (_.isEmpty(data)) throw Boom.notFound('Ticket not found!');

        const userIdCheck = data?.dataValues?.createdBy;
        if (userIdCheck !== userId) throw Boom.unauthorized('Your user account does not allowed to modify other user data!');

        await data.update({ isActive: false });

        return Promise.resolve({
            deletedId: data?.id,
        });
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

const deleteCoupons = async (dataObject, userId) => {
    try {
        const { id } = dataObject;

        const data = await db.coupon.findOne({
            where: { id, is_active: true }
        });
        if (_.isEmpty(data)) throw Boom.notFound('Coupon not found!');

        const userIdCheck = data?.dataValues?.createdBy;
        if (userIdCheck !== userId) throw Boom.unauthorized('Your user account does not allowed to modify other user data!');

        await data.update({ is_active: false });

        return Promise.resolve({
            deletedId: data?.id,
        });
    } catch (err) {
        return Promise.reject(GeneralHelper.errorResponse(err));
    }
};

module.exports = {
    getAllBooking,
    getBookingDetailWithId,
    getAllCoupons,
    getAllTickets,
    getTicketDetail,

    addBooking,
    addCoupon,
    addTicket,

    editTicketData,
    editCouponData,

    deleteTicket,
    deleteCoupons,
}
