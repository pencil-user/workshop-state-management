"use strict"

const express = require('express')
const router = express.Router()

const validation = require('../middleware/validation')

const employeesService = require('../services/employeesService.js')

const yup = require('yup')


const getSchema = yup.object({
    query: yup.object({
        limit: yup
            .string().matches(/^\d+$/, 'This should be numeric'),
        skip: yup
            .string().matches(/^\d+$/, 'This should be numeric'),
    })
})

router.get('/',
    validation(getSchema),
    async (req, res) => {
        const limit = +req.query.limit || 10
        const skip = +req.query.skip || 0
        const result = await employeesService.getInactive(limit, skip)
        const count = await employeesService.countInactive()
        res.status(200).json({
            count: count,
            skip: skip,
            limit: limit,
            data: result
        })
    }
)

module.exports = router;