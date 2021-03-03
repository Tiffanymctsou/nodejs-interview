const router = require("express").Router();
const { wrapAsync } = require("../../util/util");

const {
    getList,
    createList,
    getListDetail,
    updateList
} = require('../controllers/to_do_list_controller');

router.route('/to-do-list/list').get(wrapAsync(getList));

router.route('/to-do-list/detail/create/page').get(wrapAsync(createList));

router.route('/to-do-list/detail/:to_do_id').get(wrapAsync(getListDetail));

router.route('/to-do-list/detail/:to_do_id').put(wrapAsync(updateList));

module.exports = router;
