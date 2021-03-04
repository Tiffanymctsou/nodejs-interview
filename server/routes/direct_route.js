const router = require("express").Router();
const { wrapAsync } = require("../../util/util");

const {
    renderWelcome,
    renderLogin,
    renderList
} = require('../controllers/direct_controller');

router.route('/welcome').get(wrapAsync(renderWelcome));

router.route('/login').get(wrapAsync(renderLogin));

router.route('/to-do-list/page').get(wrapAsync(renderList));

module.exports = router;
