const Member = require('../models/member_model');
const salt = parseInt(process.env.BCRYPT_SALT);
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expire = process.env.TOKEN_EXPIRE;

const createMember = async (req, res) => {
    const memberInfo = req.body;
    console.log(memberInfo);
    if (!memberInfo) {
        res.status(400).json({
            error: "Request Error: Please fill in the required information."
        });
        return;
    }

    const { name, account, password } = memberInfo;

    if (!name || !account || !password) {
        res.status(400).json({
            error: "Request Error: Information missing.",
        });
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
    
};

const verifyToken = async (req, res) => {
    
};

module.exports = {
    createMember,
    nativeLogin,
    verifyToken
};