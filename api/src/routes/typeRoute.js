const { Router } = require("express");
const router = Router();
const { getTypes } = require("./typeFunctions");

router.get('/', async (req, res, next) => {
    const types = await getTypes();
    res.send(types);
});

module.exports = router;