const {
  errorInInputResponse,
  errorInValidationResponse,
  successResponse,
} = require("../helpers/responseHelper");

exports.getIndex = async (req, res) => {
  return res.status(200).json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Jedidiah Anthony",
      github: "@jeddtony",
      email: "jedidiahanthony@gmail.com",
      mobile: "08132387257",
      twitter: "@JeddTony",
    },
  });
};

exports.postValidate = async (req, res) => {
  let rule = req.body.rule;
  let data = req.body.data;

  // Check if user input is correct
  let userInput = checkIfUserInputIsValid(rule, data);

  if (!userInput.status) {
    return errorInInputResponse(res, userInput.message);
  }

  let keyToValidate;

  let field = rule.field;
  let condition = rule.condition;
  let conditionValue = rule.condition_value;

  // At this point the user's input are correct
  // get key to validate
  keyToValidate = getValidationKey(data, field);

  if (!keyToValidate && keyToValidate != 0) {
    return errorInValidationResponse(
      res,
      `field ${field} failed validation.`,
      field,
      "undefined",
      condition,
      conditionValue
    );
  }
  switch (condition) {
    case "neq":
    //   console.log("condition not equal");
      if (keyToValidate != conditionValue) {
        return successResponse(
          res,
          `field ${field} successfully validated.`,
          field,
          keyToValidate,
          condition,
          conditionValue
        );
      }

      return errorInValidationResponse(
        res,
        `field ${field} failed validation.`,
        field,
        keyToValidate,
        condition,
        conditionValue
      );
      break;
    case "eq":
    //   console.log("condition is equal");
      if (keyToValidate == conditionValue) {
        return successResponse(
          res,
          `field ${field} successfully validated.`,
          field,
          keyToValidate,
          condition,
          conditionValue
        );
      }

      return errorInValidationResponse(
        res,
        `field ${field} failed validation.`,
        field,
        keyToValidate,
        condition,
        conditionValue
      );
      break;
    case "gt":
    //   console.log("condition is greater than");
      if (keyToValidate > conditionValue) {
        return successResponse(
          res,
          `field ${field} successfully validated.`,
          field,
          keyToValidate,
          condition,
          conditionValue
        );
      }

      return errorInValidationResponse(
        res,
        `field ${field} failed validation.`,
        field,
        keyToValidate,
        condition,
        conditionValue
      );

      break;
    case "gte":
    //   console.log("condition is greater than or equal to");
      if (keyToValidate >= conditionValue) {
        return successResponse(
          res,
          `field ${field} successfully validated.`,
          field,
          keyToValidate,
          condition,
          conditionValue
        );
      }

      return errorInValidationResponse(
        res,
        `field ${field} failed validation.`,
        field,
        keyToValidate,
        condition,
        conditionValue
      );

      break;
    case "contains":
    //   console.log("condition is greater than or equal to");
      if (keyToValidate.includes(conditionValue)) {
        return successResponse(
          res,
          `field ${field} successfully validated.`,
          field,
          keyToValidate,
          condition,
          conditionValue
        );
      }

      return errorInValidationResponse(
        res,
        `field ${field} failed validation.`,
        field,
        keyToValidate,
        condition,
        conditionValue
      );

      break;
    default:
      return res.status(400).json({
        message: "Invalid condition passed.",
        status: "error",
        data: null,
      });
      break;
  }
};

const getValidationKey = (data, field) => {
  let fieldType = null;
  let keyToValidate;
  fieldType = Number(field);
//   console.log(data);

  // Checks if it's an array
  if (Array.isArray(data)) {
    keyToValidate = data[fieldType];
  }

  if (fieldType || fieldType == 0) {
    // console.log("it is  a number");
    keyToValidate = data[fieldType];
  } else {
    // check if field contains a dot
    let indexOfDot = field.indexOf(".");
    // console.log("this is the index of dot ", indexOfDot);
    if (indexOfDot == 0) {
      throw new Error("Invalid JSON");
    } else if (indexOfDot < 0) {
      fieldType = "string";
      keyToValidate = data[field];
    } else {
      let splittedFields = field.split(".");
      if (splittedFields.length > 2) {
        throw new Error("Only 2 levels of nesting is accepted");
      }
    //   console.log("the fields are ", splittedFields);
      if (data[splittedFields[0]]) {
        keyToValidate = data[splittedFields[0]][splittedFields[1]];
      }
    }
  }
//   console.log("the key to validate ", keyToValidate);
  return keyToValidate;
};

const checkIfUserInputIsValid = (rule, data) => {
  if (!rule) {
    return { status: false, message: "rule is required." };
  }
  if (!isObject(rule)) {
    return { status: false, message: "rule should be an object." };
  }
  if (!Object.keys(rule).includes("field")) {
    return { status: false, message: "field is required." };
  }
  if (!Object.keys(rule).includes("condition")) {
    return { status: false, message: "condition is required." };
  }
  if (!Object.keys(rule).includes("condition_value")) {
    return { status: false, message: "condition_value is required." };
  }

  // Check if condition is valid
  let condition = rule.condition;
  if (typeof condition != "string") {
    return { status: false, message: "condition should be a string" };
  }
  if (
    condition != "neq" &&
    rule.condition != "eq" &&
    rule.condition != "gt" &&
    rule.condition != "gte" &&
    rule.condition != "contains"
  ) {
    return {
      status: false,
      message: "condition should be neq or eq or gt or gte or contains",
    };
  }

  // Check if condition value is valid
  // if()
  return { status: true };
};

const isObject = (obj) => {
 
  return Object.prototype.toString.call(obj) === "[object Object]";
};
