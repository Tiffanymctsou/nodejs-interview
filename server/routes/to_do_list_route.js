const router = require("express").Router();
const { wrapAsync } = require("../../util/util");

const {
    getList,
    createList,
    getListDetails,
    updateList
} = require('../controllers/to_do_list_controller');

const {
    verifyToken
} = require('../controllers/member_controller');

router.route('/to-do-list/list').get(verifyToken, wrapAsync(getList));

router.route('/to-do-list/detail/create/page').get(wrapAsync(createList));

router.route('/to-do-list/detail/:to_do_id').get(wrapAsync(getListDetails));

router.route('/to-do-list/detail/:to_do_id').put(wrapAsync(updateList));

module.exports = router;
