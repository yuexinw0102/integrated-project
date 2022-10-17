const express = require("express");
const router = express.Router();
const dao = require("../dao/orderDao");

// 获取所有数据
router.get("/getAll.do", async function (req, res, next) {
  try {
    const result = await dao.findAll();
    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.locals.err = err;
    next();
  }
});
//查询
router.get("/getByPage.do", async (req, res, next) => {
  try {
    const result = await dao.findByPage(req.query);
    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.locals.err = err;
    next();
  }
});

module.exports = router;
