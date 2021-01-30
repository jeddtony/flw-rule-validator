
const ValidationController = require('../controller/ValidatorController');

const router = require('express').Router();

router.get('/', ValidationController.getIndex);


router.post('/validate-rule', ValidationController.postValidate);





module.exports = router;