const express = require('express');
const m_route = express.Router();

m_route.use('/add', require('./membership.controller').add());
m_route.use('/delete', require('./payment/payment.routes'));
m_route.use('/update', require('./attendance/attendance.routes'));

module.exports = m_route;
