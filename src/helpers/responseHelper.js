const { DEFAULT_ERROR_STATUS_CODE, DEFAULT_SUCCESS_STATUS_CODE } = require('../constants');
const errorInInputResponse = (res, message ) => {
    return res.status(DEFAULT_ERROR_STATUS_CODE).json({
        message,
        "status": "error",
        "data": null
    })
}


const errorInValidationResponse = (res, message, field, fieldValue, condition, conditionValue ) => {
    return res.status(DEFAULT_ERROR_STATUS_CODE).json({
        message,
        "status": "error",
        "data": {
            "validation": {
            "error": false,
            "field": field,
            "field_value": fieldValue,
            "condition": condition,
            "condition_value": conditionValue
        }
        }
    });
}

const successResponse = (res, message, field, fieldValue, condition, conditionValue) => {
    return res.status(DEFAULT_SUCCESS_STATUS_CODE).json({
        message,
        "status": "success",
        "data": {
            "validation": {
            "error": false,
            "field": field,
            "field_value": fieldValue,
            "condition": condition,
            "condition_value": conditionValue
        }
        }
    });
}

module.exports = {errorInInputResponse, successResponse, errorInValidationResponse}