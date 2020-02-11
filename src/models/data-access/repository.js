class Repository {
    constructor(model) {
        this.model = model;
    }

    /**
     *
     * @param document
     * @returns {Promise<document>}
     */
    async create(document) {
        return this.model.create(document);
    };

    /**
     *
     * @param whereClause
     * @param projection
     * @returns {Promise<Promise<*>|Query|void>}
     */
    async findOne(whereClause, projection) {
        return this.model.findOne(whereClause, projection);
    };

    /**
     *
     * @param whereClause
     * @param projection
     * @returns {Promise<*>}
     */
    async findAll (whereClause, projection) {
        return this.model.findAll(whereClause, projection);
    }
}

module.exports = Repository;
