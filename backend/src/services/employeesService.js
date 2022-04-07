"use strict"

//const employeesModel = require('../models/employeesModel.js')
let people = require('./people.js')
let peopleID = people.length + 1
const deletedPeople = []

async function getActive(limit = 10, skip = 0) {
    const result = people.slice(skip, limit + skip)//await employeesModel.find({ 'Active': true }).limit(limit).skip(skip).lean()
    return result
}

async function countActive() {
    const result = people.length//await employeesModel.count({ 'Active': true })
    return result
}

async function getInactive(limit = 10, skip = 0) {
    const result = deletedPeople.slice(skip, limit + skip)//await employeesModel.find({ 'Active': false }).limit(limit).skip(skip).lean()
    return result
}

async function countInactive() {
    const result = deletedPeople.length//await employeesModel.count({ 'Active': false })
    return result
}

async function getOne(_id) {
    const result = people.find(person => person.id == _id)//await employeesModel.findOne({ '_id': _id }).lean()
    return result
}

async function softDelete(_id) {
    const person = people.filter(person => person.id == _id)[0]//await employeesModel.findByIdAndUpdate(_id, { Active: false }, { new: true })
    deletedPeople.push(person)
    people = people.filter(person => person.id != _id)
    return _id
}

async function post(data) {
    peopleID++
    const person = { data, id: peopleID }
    people.push(person)

    //await employee.save()
    return person
}

async function put(_id, data) {
    //const result = await employeesModel.findByIdAndUpdate(_id, data, { new: true })
    const objIndex = people.findIndex((obj => obj.id == _id));

    people[objIndex] = { ...data, id: people[objIndex].id }
    return people[objIndex]
}

module.exports = { getActive, countActive, getInactive, countInactive, getOne, softDelete, post, put }