const express = require('express');
const authService = require('./authService');
const Libs = require('../libs');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

function responseError(response, errMessage) {
    let status;
    switch (errMessage) {
        // case Libs.Errors.CompanyValidation.CompanyDoesNotExists:
        //   status = 404;
        //   break;
        // case Libs.Errors.TextValidation.InvalidCompanyName:
        // case Libs.Errors.InvalidUrl:
        //   status = 400;
        //   break;
        // case Libs.Errors.CompanyValidation.CompanyNameAlreadyExists:
        //   status = 403;
        //   break;
        // case Libs.Errors.CompanyValidation.CompanyPasswordNotMatch:
        //   status = 401;
        //   break;
        default:
            status = 500;
            break;
    }

    return response.status(status).send(errMessage);
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await authService.login(email, password);
        user.password = undefined;
        res.send(user);
    } catch (err) {
        return responseError(res, err.message);
    }
}

async function signup(req, res) {
    try {
        console.log(req.body);
        const user = await authService.signup(req.body);
        res.send(user);
    } catch (err) {
        return responseError(res, err.message);
    }
}

async function logout(req, res) {
    try {
        req.session.destroy();
        res.send({ message: 'logged out successfully' });
    } catch (err) {
        res.status(401).send({ error: err });
    }
}

module.exports = router;
