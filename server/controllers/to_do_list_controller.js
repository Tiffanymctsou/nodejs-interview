const ToDoList = require("../models/to_do_list_model");

const getList = async (req, res) => {
    const lists = await ToDoList.getLists();
    res.json(lists);
};

const createList = async (req, res) => {
    const nextListId = await ToDoList.getListId();
    res.render('to-do-detail.html', { to_do_id: nextListId });
};

const getListDetails = async (req, res) => {
    const { to_do_id } = req.params;
    const listDetail = await ToDoList.getListDetails(to_do_id);
    res.render('to-do-detail.html', listDetail);
};

const updateList = async (req, res) => {
    const { mode } = req.query;
    const listDetails = req.body;
    const { to_do_id } = listDetails;
    switch (mode) {
    case 'create': {
        const result = await ToDoList.insertList(listDetails);
        if (result.error) {
            res.status(403).json(result.error);
            return;
        }
        res.status(200).json(result);
        break;
    }
    case 'edit': {
        const result = await ToDoList.updateList(to_do_id, listDetails);
        if (result.error) {
            res.status(403).json(result.error);
            return;
        }
        res.status(200).json(result);
        break;
    }
    }
};


module.exports = {
    getList,
    createList,
    getListDetails,
    updateList
};