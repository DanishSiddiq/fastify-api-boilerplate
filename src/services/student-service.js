const studentModel = require('../models/student-model');
const Repository = require('../models/data-access/repository');

const create = async (data) => {
    const repository = new Repository(studentModel);
    return repository.create(data);
};

const findOne = async (whereClause, projection = {}) => {
    const repository = new Repository(studentModel);
    return repository.findOne({ _id: whereClause._id }, projection);
};

module.exports = { create, findOne };


