const Joi = require('joi');
const Boom = require('boom');

const allBookingValidation = (data) => {
  const schema = Joi.object({
    bookingType: Joi.string().valid('VIP','ECO').optional().description('Type of booking, allowed only VIP and ECO.'),
    customerName: Joi.string().optional().description("Search customer name")
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const allTicketsValidation = (data) => {
  const schema = Joi.object({
    ticketName: Joi.string().optional().description("Search ticket name")
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const allCustomersValidation = (data) => {
  const schema = Joi.object({
    customerName: Joi.string().optional().description("Search customer name")
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const ticketFormValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required().description('Title ticket'),
    location: Joi.string().min(2).max(255).required().description('Location of ticket'),
    description: Joi.string().min(5).max(500).required().description('Ticket description'),
    variants: Joi.string().required().description('Ticket variants in json')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const customerFormValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required().description('Name of customer'),
    dob: Joi.date().required().description('date of birth customer'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const bookingRequestValidation = (data) => {
  const schema = Joi.object({
    data: Joi.string().required().description('Encrypted data payment required')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const bookingDataFormValidation = (data) => {
  const schema = Joi.object({
    ticketId: Joi.number().required().description('Ticket id is required!'), 
    variant: Joi.object({
      variantName: Joi.string().required().description('Variant name is required!'),
      price: Joi.number().required().description('Price is required!')
    }).required().description('Variant is required!'), 
    paymentMethod: Joi.string().required().description('Payment method is required!'), 
    totalPayment: Joi.number().required().description('Total payment is required!'), 
    coupons: Joi.array().items(Joi.number().description('Coupon data must be number!')).required().description('Coupons is required!')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const couponDataFormValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required().description('Name of coupon'),
    priceCut: Joi.number().min(5000).max(200000).precision(2).required().description('Price cut of coupon, should be minimum of 5000 and maximum of 200000')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const appendCouponValidation = (data) => {
  const schema = Joi.object({
    couponId: Joi.number().integer().required().description('Id of coupon'),
    bookingId: Joi.number().integer().required().description('Id of booking')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editTicketFormValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().description('Id of ticket'),
    title: Joi.string().min(5).max(255).required().description('Title ticket'),
    location: Joi.string().min(2).max(255).required().description('Location of ticket'),
    description: Joi.string().min(5).max(500).required().description('Ticket description'),
    variants: Joi.string().required().description('Ticket variants in json')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editCustomerFormValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().description('Id of customer'),
    name: Joi.string().max(255).required().description('Name of customer'),
    dob: Joi.date().required().description('date of birth customer'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editCouponFormValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().description('Id of coupon'),
    name: Joi.string().max(255).required().description('Name of coupon'),
    priceCut: Joi.number().min(5000).max(200000).precision(2).required().description('Price cut of coupon, should be minimum of 5000 and maximum of 200000')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editBookingStatusValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().description('Id of booking'),
    isSuccess: Joi.boolean().required().description('Must provide success value!')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const idValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().description('Id must be number'),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  allBookingValidation,
  allCustomersValidation,
  allTicketsValidation,

  ticketFormValidation,
  customerFormValidation,
  bookingRequestValidation,
  bookingDataFormValidation,
  couponDataFormValidation,
  appendCouponValidation,

  editTicketFormValidation,
  editCustomerFormValidation,
  editCouponFormValidation,
  editBookingStatusValidation,

  idValidation
};
