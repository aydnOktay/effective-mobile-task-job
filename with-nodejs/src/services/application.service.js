const applicationModel = require("../models/applications.schema");
const BaseService = require("./base/base.service");

class ApplicationService extends BaseService {
    constructor() {
        super(applicationModel);
    }
}

module.exports = new ApplicationService();