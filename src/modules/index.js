const express = require('express');
const router = express.Router();

// router.use('/auth', require('./auth/user.routes'));
// router.use('/payment', require('./payment/payment.routes'));
// router.use('/attendance', require('./attendance/attendance.routes'));
// router.use('/diet', require('./diet/diet.routes'));
// router.use('/membership', require('./membership/membership.routes'));
// router.use('/plans', require('./plans/plans.routes'));
// router.use('/trainer', require('./trainer/trainer.routes'));

router.use('/user', require('./users/auth.routes'));
router.get('/membership',async (req,res)=>{
    res.status(200).json({result:'success',msg:'Successfully backend API called here..'});
});

module.exports = router;
