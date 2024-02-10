const Request = require('supertest');
const QS = require('qs');
const _ = require('lodash');

const db = require('../../models');
const cloudinary = require('../../server/services/cloudinary.js');
const GeneralHelper = require('../../server/helpers/generalHelper');
const TicketPlugin = require('../../server/api/ticket.js');

// Mock Datas JSON
const MockTicket = require('../fixtures/database/allTickets.json');
const MockTicketDetail = require('../fixtures/database/ticketDetail.json');
const MockBooking = require('../fixtures/database/allBooking.json');
const MockBookingDetail = require('../fixtures/database/bookingDetail.json');
const MockCoupon = require('../fixtures/database/allCoupon.json');
const MockCouponByTicketId = require('../fixtures/database/allCouponByTicketId.json');

// Config
let apiUrl;
let server;
let query;
let body;
let bearerTokenCustomer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwNzU5OTQ2MCwiZXhwIjoxNzM5MTM1NDYwfQ.4r3qbfjJhx4Qd0y6zpUrI1RBFRYZ1TBG8-EJjNxjPyM';
let bearerTokenBusiness = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJidXNpbmVzcyIsImlhdCI6MTcwNzU5OTM0NywiZXhwIjoxNzM5MTM1MzQ3fQ.CPxI6wdRXDBhEe6DSIdAQQzOvrQBFrU93Zsxo7VNk60';

// Databases
let mockTicket;

// Spy DB
let getTickets;
let createTickets;
let updateTickets;
let transaction;

// Spy function
let uploadCloudinary;

describe('Ticket Json', () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer('/ticket', TicketPlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('All Ticket', () => {
    beforeEach(() => {
      apiUrl = '/ticket/ticket';

      mockTicket = _.cloneDeep(MockTicket).map(data => ({ dataValues: data }));

      getTickets = jest.spyOn(db.ticket, 'findAll');
    });

    test('Should Return 200: Get All Ticket Public', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(apiUrl)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Ticket Detail', () => {
    beforeEach(() => {
      query = {
        id: 1
      };
      apiUrl = '/ticket/ticket/detail';

      mockTicket = { dataValues: _.cloneDeep(MockTicketDetail) };

      getTickets = jest.spyOn(db.ticket, 'findOne');
    });

    test('Should Return 200: Get Ticket Detail', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(`${apiUrl}?${QS.stringify(query)}`)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business My All Ticket', () => {
    beforeEach(() => {
      apiUrl = '/ticket/ticket/mytickets';

      mockTicket = _.cloneDeep(MockTicket).map(data => ({ dataValues: data }));

      getTickets = jest.spyOn(db.ticket, 'findAll');
    });

    test('Should Return 200: Get All My Ticket', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(apiUrl)
        .set('Authorization', bearerTokenBusiness)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business Ticket Detail', () => {
    beforeEach(() => {
      query = {
        id: 1
      };
      apiUrl = '/ticket/ticket/mytickets/detail';

      mockTicket = { dataValues: _.cloneDeep(MockTicketDetail) };

      getTickets = jest.spyOn(db.ticket, 'findOne');
    });

    test('Should Return 200: Get My Ticket Detail', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(`${apiUrl}?${QS.stringify(query)}`)
        .set('Authorization', bearerTokenBusiness)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Customer All Booking Data', () => {
    beforeEach(() => {
      apiUrl = '/ticket/booking';

      mockTicket = _.cloneDeep(MockBooking).map(data => ({ dataValues: data }));

      getTickets = jest.spyOn(db.booking, 'findAll');
    });

    test('Should Return 200: Get Customer All Booking', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(apiUrl)
        .set('Authorization', bearerTokenCustomer)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Customer Booking Detail', () => {
    beforeEach(() => {
      query = {
        id: 1
      };
      apiUrl = '/ticket/booking/detail';

      mockTicket = { dataValues: _.cloneDeep(MockBookingDetail) };

      getTickets = jest.spyOn(db.booking, 'findOne');
    });

    test('Should Return 200: Get Customer Booking Detail', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(`${apiUrl}?${QS.stringify(query)}`)
        .set('Authorization', bearerTokenCustomer)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business All Booking Data', () => {
    beforeEach(() => {
      apiUrl = '/ticket/booking/business';

      mockTicket = _.cloneDeep(MockBooking).map(data => ({ dataValues: data }));

      getTickets = jest.spyOn(db.booking, 'findAll');
    });

    test('Should Return 200: Get Business All Booking', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(apiUrl)
        .set('Authorization', bearerTokenBusiness)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business Booking Detail', () => {
    beforeEach(() => {
      query = {
        id: 1
      };
      apiUrl = '/ticket/booking/business/detail';

      mockTicket = { dataValues: _.cloneDeep(MockBookingDetail) };

      getTickets = jest.spyOn(db.booking, 'findOne');
    });

    test('Should Return 200: Get Business Booking Detail', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(`${apiUrl}?${QS.stringify(query)}`)
        .set('Authorization', bearerTokenBusiness)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business All Coupon Data', () => {
    beforeEach(() => {
      apiUrl = '/ticket/coupon';

      mockTicket = _.cloneDeep(MockCoupon).map(data => ({ dataValues: data }));

      getTickets = jest.spyOn(db.coupon, 'findAll');
    });

    test('Should Return 200: Get Business All Coupon', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(apiUrl)
        .set('Authorization', bearerTokenBusiness)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Customer All Coupon Data By Ticket Id', () => {
    beforeEach(() => {
      apiUrl = '/ticket/coupon/byticket';
      query = {
        id: 1
      };

      mockTicket = { dataValues: _.cloneDeep(MockCouponByTicketId) }

      getTickets = jest.spyOn(db.ticket, 'findOne');
    });

    test('Should Return 200: Get Business All Coupon', async () => {
      getTickets.mockResolvedValue(mockTicket);

      const res = await Request(server)
        .get(`${apiUrl}?${QS.stringify(query)}`)
        .set('Authorization', bearerTokenCustomer)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Customer Create Booking', () => {
    beforeEach(() => {
      apiUrl = '/ticket/booking/create';
      body = {
        data: "U2FsdGVkX1/5ojfIeq1VN6zL1ChOXw7/MkfsMabvayI/LncfJIjIGZWrDQe68tk2wyEwXemEYE7XNJyFF/hfb82gI6nGfdASOEJj/vtg5CuJqNvhJP3pkcZL5VplNg+CTYfpzTP52/3G74DVHgIuF3+zs1bVHo/ByicG2J16ENVIMNW87pY/z8FY+FDmAFJ9+7s2spHaVPtq0lHP7ODi4A=="
      };

      mockTicket = { dataValues: _.cloneDeep(MockTicketDetail) };

      jest.mock('../../models', () => ({
        sequelize: {
          transaction: jest.fn()
        },
        ticket: {
          findOne: jest.fn()
        }
      }));


      getTickets = jest.spyOn(db.ticket, 'findOne');
      transaction = jest.spyOn(db.sequelize, 'transaction');
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test('Should Return 200: Create Customer Booking Data', async () => {
      getTickets.mockResolvedValue(mockTicket);
      transaction.mockResolvedValue(1);

      const res = await Request(server)
        .post(`${apiUrl}`)
        .set('Authorization', bearerTokenCustomer)
        .send(body)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business Create Coupon', () => {
    beforeEach(() => {
      apiUrl = '/ticket/coupon/create';
      body = {
        name: "Test kupon",
        priceCut: 10000
      };

      createTickets = jest.spyOn(db.coupon, 'create');
    });

    test('Should Return 200: Create Business Coupon Data', async () => {
      createTickets.mockResolvedValue('SUCCESS');

      const res = await Request(server)
        .post(`${apiUrl}`)
        .set('Authorization', bearerTokenBusiness)
        .send(body)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business Create Ticket', () => {
    beforeEach(() => {
      apiUrl = '/ticket/ticket/create';
      body = {
        title: 'Test Create',
        location: 'Test Location',
        description: 'test desc',
        variants: '[{"variantName":"test variant 1","price":"10000"},{"variantName":"test variant 2","price":"100000"}]',
      };

      createTickets = jest.spyOn(db.ticket, 'create');
      uploadCloudinary = jest.spyOn(cloudinary, 'uploadToCloudinary');
    });

    test('Should Return 200: Create Business Ticket Data', async () => {
      createTickets.mockResolvedValue('SUCCESS');
      uploadCloudinary.mockResolvedValue({ url: 'this is url' });

      const filePath = './__test__/fixtures/file/en.png';

      const res = await Request(server)
        .put(`${apiUrl}`)
        .set('Authorization', bearerTokenBusiness)
        .field('title', body?.title)
        .field('location', body?.location)
        .field('description', body?.description)
        .field('variants', body?.variants)
        .attach('imageData', filePath)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business Edit Ticket', () => {
    beforeEach(() => {
      apiUrl = '/ticket/ticket/edit';
      body = {
        id: 1,
        title: 'Test Create',
        location: 'Test Location',
        description: 'test desc',
        variants: '[{"variantName":"test variant 1","price":"10000"},{"variantName":"test variant 2","price":"100000"}]',
      };

      mockTicket = { dataValues: _.cloneDeep(MockTicketDetail), update: jest.fn() };
      getTickets = jest.spyOn(db.ticket, 'findOne');
      updateTickets = jest.spyOn(mockTicket, 'update');
      uploadCloudinary = jest.spyOn(cloudinary, 'uploadToCloudinary');
    });

    test('Should Return 200: Edit Business Ticket Data', async () => {
      getTickets.mockResolvedValue(mockTicket);
      uploadCloudinary.mockResolvedValue({ url: 'this is url' });
      updateTickets.mockResolvedValue('SUCCESS');

      const filePath = './__test__/fixtures/file/en.png';

      const res = await Request(server)
        .patch(`${apiUrl}`)
        .set('Authorization', bearerTokenBusiness)
        .field('id', body?.id)
        .field('title', body?.title)
        .field('location', body?.location)
        .field('description', body?.description)
        .field('variants', body?.variants)
        .attach('imageData', filePath)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business Update Booking Status', () => {
    beforeEach(() => {
      apiUrl = '/ticket/booking/status/update';
      body = {
        id: 1,
        isSuccess: true
      };

      getTickets = jest.spyOn(db.booking, 'findOne');
      mockTicket = { dataValues: _.cloneDeep(MockBookingDetail), update: jest.fn() };
      updateTickets = jest.spyOn(mockTicket, 'update');
    });

    test('Should Return 200: Business Update Booking Status Data', async () => {
      getTickets.mockResolvedValue(mockTicket);
      updateTickets.mockResolvedValue('SUCCESS');

      const res = await Request(server)
        .patch(`${apiUrl}`)
        .set('Authorization', bearerTokenBusiness)
        .send(body)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business Delete Ticket', () => {
    beforeEach(() => {
      apiUrl = '/ticket/ticket/delete';
      body = {
        id: 1
      };

      getTickets = jest.spyOn(db.ticket, 'findOne');
      mockTicket = { dataValues: _.cloneDeep(MockTicketDetail), update: jest.fn() };
      updateTickets = jest.spyOn(mockTicket, 'update');
    });

    test('Should Return 200: Business Delete Ticket Data', async () => {
      getTickets.mockResolvedValue(mockTicket);
      updateTickets.mockResolvedValue('SUCCESS');

      const res = await Request(server)
        .delete(`${apiUrl}`)
        .set('Authorization', bearerTokenBusiness)
        .send(body)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });

  describe('Business Delete Coupon', () => {
    beforeEach(() => {
      apiUrl = '/ticket/coupon/delete';
      body = {
        id: 1
      };

      getTickets = jest.spyOn(db.coupon, 'findOne');
      mockTicket = { dataValues: _.cloneDeep(MockTicketDetail), update: jest.fn() };
      updateTickets = jest.spyOn(mockTicket, 'update');
    });

    test('Should Return 200: Business Delete Coupon Data', async () => {
      getTickets.mockResolvedValue(mockTicket);
      updateTickets.mockResolvedValue('SUCCESS');

      const res = await Request(server)
        .delete(`${apiUrl}`)
        .set('Authorization', bearerTokenBusiness)
        .send(body)
        .expect(200)

      expect(res.body?.data).toBeTruthy();
    });
  });
});