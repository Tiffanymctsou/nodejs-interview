const Member = require('../models/member_model');
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const header = req.header('Authorization');
    const token = header.replace('Bearer ', '');
    jwt.verify(token, secret, (err, decodedData) => {
        if (err) {
            res.status(403).send({ message: err.message });
            return;
        }
        req.templateName = decodedData.name;
        next();
    });
};
const createMember = async (req, res) => {
    const memberInfo = req.body;
    if (!memberInfo) {
        res.status(400).json({
            error: "Request Error: Please fill in the required information."
        });
        return;
    }

    const { name, account, password } = memberInfo;

    if (!name || !account || !password) {
        res.status(400).json({ error: "Request Error: Information missing.",});
        return;
    }
    
    const result = await Member.createMember(memberInfo);

    if (result.error) {
        res.status(403).json(result);
        return;
    }
    res.status(200).json(result);
};

const nativeLogin = async (req, res) => {
    const { account, passwd } = req.body;
    if (!account) {
        res.status(400).json({ message: '請輸入帳號！' });
        return;
    }
    if (!passwd) {
        res.status(400).json({ message: '請輸入密碼！' });
        return;
    }

    const result = await Member.nativeLogin(account, passwd);
    if (result.message) {
        res.status(403).json(result);
        return;
    }
    result.redirect = '/welcome';
    res.status(200).json(result);
};


module.exports = {
    createMember,
    nativeLogin,
    verifyToken
};