class Repository {
    constructor(model) {
        this.model = model;
    }

    findOne = async (whereClause, projection) => {
        return this.model.findOne(whereClause, projection);
    };

    findAll = async (whereClause, projection) => {
        return this.model.findAll(whereClause, projection);
    }
}

module.exports = Repository;
