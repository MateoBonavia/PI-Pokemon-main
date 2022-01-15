const { Router } = require("express");
const router = Router();
const { getTypes } = require("./typeFunctions");

router.get("/", async (req, res, next) => {
  try {
    const type = req.body.name;
    const types = await getTypes(type);
    res.send(types);
  } catch (e) {
      console.log(e);
  }
});

module.exports = router;
