const express = require('express')
const assert = require('assert')
const chai = require('chai')
chai.should()
const router = express.Router()
const userController = require('../controllers/user.controller')
const database = require('../dao/inmem-db')
const userService = require('../services/user.service')

// Tijdelijke functie om niet bestaande routes op te vangen
const notFound = (req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Route not found',
        data: {}
    })
}

// Input validation functions for user routes

// Input validation function 2 met gebruik van assert
// Input validation functions for user routes
const validateUserCreateChaiShould = (req, res, next) => {
    try {
        // Controleer of voornaam en achternaam niet leeg zijn en van het juiste gegevenstype (string)
        chai
            .expect(req.body.firstName, 'First name is missing or not a string')
            .to.be.a('string').and.not.empty
        chai
            .expect(req.body.lastName, 'Last name is missing or not a string')
            .to.be.a('string').and.not.empty

        // Controleer of e-mail niet leeg is en van het juiste gegevenstype (string)
        chai
            .expect(
                req.body.emailAdress,
                'Email address is missing or not a string'
            )
            .to.be.a('string').and.not.empty

        // Controleer of e-mail het juiste formaat heeft
        chai.expect(
            req.body.emailAdress,
            'Email address is not in the correct format'
        ).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

        next()
    } catch (ex) {
        return res.status(400).json({
            status: 400,
            message: ex.message,
            data: {}
        })
    }
}

// Userroutes
router.post('/api/users', validateUserCreateChaiShould, userController.create)
router.get('/api/users', userController.getAll)
router.get('/api/users/:userId', userController.getById)
router.put('/api/users/:userId', userController.update, notFound)
router.delete('/api/users/:userId', userController.delete, notFound)

module.exports = router
