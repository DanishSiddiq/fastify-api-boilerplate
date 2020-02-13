const { ObjectId } = require('mongodb');

class Repository {
    constructor(model) {
        this.model = model;
    }

    /**
     *
     * @param document
     * @returns {Promise<document>}
     */
    async createOne(document) {
        return this.model.create(document);
    };

    /**
     *
     * @param whereClause
     * @param document
     * @returns {Promise<Query|*>}
     */
    async updateOne(whereClause = {}, document) {
        return this.model.updateOne(whereClause, document);
    };

    /**
     *
     * @param whereClause
     * @param projection
     * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>|Promise<*>>}
     */
    async findOne(whereClause = {}, projection = {}) {
        whereClause = (whereClause && whereClause._id) ? { ...whereClause, _id: ObjectId(whereClause._id) } : whereClause;
        return this.model.findOne(whereClause, projection);
    };

    /**
     *
     * @param whereClause
     * @param projection
     * @returns {Promise<*>}
     */
    async findAll (whereClause = {}, projection = {}) {
        return this.model.findAll(whereClause, projection);
    }
}

module.exports = Repository;
