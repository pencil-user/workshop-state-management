"use strict"

const express = require('express')
const router = express.Router()

const employeesService = require('../services/employeesService.js')
const validation = require('../middleware/validation')
const yup = require('yup')

/// schemas:

const employeeSchema = yup.object({
    Name: yup
        .string()
        .trim()
        .min(4, 'At least four characters')
        .required('Enter employee name'),
    Email: yup
        .string()
        .trim()
        .email('Enter a valid email')
        .required('Email is required'),
    Phone: yup
        .string()
        .trim()
        .min(6, 'At least six characters')
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Enter a valid phone')
        .required('Enter a phone')
}).noUnknown()

const idSchema = yup.object({
    id: yup
        .string()
        .required('enter id')
})

const postSchema = yup.object({
    body: employeeSchema,
});

const putSchema = yup.object({
    body: employeeSchema,
    params: idSchema
});

const getSchema = yup.object({
    query: yup.object({
        limit: yup
            .string().matches(/^\d+$/, 'This should be numeric'),
        skip: yup
            .string().matches(/^\d+$/, 'This should be numeric'),
    })
})

const getOneSchema = yup.object({
    params: idSchema
})

const deleteSchema = yup.object({
    params: idSchema
})

// routes:

router.get('/',
    validation(getSchema),
    async (req, res) => {
        const limit = +req.query.limit || 10
        const skip = +req.query.skip || 0
        const result = await employeesService.getActive(limit, skip)
        const count = await employeesService.countActive()
        res.json({
            count: count,
            skip: skip,
            limit: limit,
            data: result
        })
    }
)

router.get('/:id',
    validation(getOneSchema),
    async (req, res) => {
        const result = await employeesService.getOne(req.params.id)
        res.status(200).json(result)
    }
)

router.post('/',
    validation(postSchema),
    async (req, res) => {
        const result = await employeesService.post(req.body)
        res.status(201).json(result)
    }
)

router.put('/:id',
    validation(putSchema),
    async (req, res) => {
        //console.log(req.body)
        const result = await employeesService.put(req.params.id, req.body)
        res.status(200).json(result)
    }
)

router.delete('/:id',
    validation(deleteSchema),
    async (req, res) => {
        const result = await employeesService.softDelete(req.params.id)
        res.status(200).json(result)
    }
)

module.exports = router;