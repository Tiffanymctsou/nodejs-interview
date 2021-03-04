const router = require("express").Router();
const { wrapAsync } = require("../../util/util");

const {
    createMember,
    nativeLogin
} = require('../controllers/member_controller');

router.route('/register').post(wrapAsync(createMember));

router.route('/auth').post(wrapAsync(nativeLogin));

module.exports = router;