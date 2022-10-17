const express = require("express");
const router = express.Router();
const dao = require("../dao/warehouse/warehouseCommunityDao.js");
const { query, body, validationResult, Result } = require("express-validator");
const { request } = require("express");

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

// 定义删除数据验证规则
const rulesDel = [query("ids").exists().withMessage("ids属性必填")];
router.get("/deleteById.do", ...rulesDel, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }
  try {
    const { result } = await dao.deleteByPrimaryKey(req.query.ids);
    res.json({
      status: result > 0 ? "success" : "error",
      message: result > 0 ? "删除成功" : "删除失败",
    });
  } catch (err) {
    console.log(err);
    res.locals.err = err;
    next();
  }
});

// 定义添加/编辑验证规则
const rules = [body("id").toInt().optional()];
// 添加
router.post("/add.do", ...rules, async (req, res, next) => {
  // console.log(' add req.body', req.body)
  const errors = validationResult(req); // 验证数据是否符合规则
  // 如果错误不为空，抛出错误
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }
  try {
    const { result, insertId } = await dao.insert(req.body);
    console.log("add req.body: ", req.body);
    res.json({
      status: result > 0 ? "success" : "error",
      message: result > 0 ? "添加成功" : "添加失败",
      insertId: result > 0 ? insertId : 0,
    });
  } catch (err) {
    console.log(err);
    res.locals.err = err;
    next();
  }
});

// 编辑
router.post("/edit.do", ...rules, async (req, res, next) => {
  const errors = validationResult(req); // 验证数据是否符合规则
  // 如果错误不为空，抛出错误
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }
  try {
    // let isExists = await dao.checkExist('title', req.body.title);
    // if (isExists) {
    //   return res.json({
    //     status: 'error',
    //     message: '商品名称已经存在！'
    //   })
    // }
    console.log("edit req.body", req.body);
    const { result } = await dao.updateByPrimaryKey(req.body, req.body.id);
    res.json({
      status: result > 0 ? "success" : "error",
      message: result > 0 ? "编辑成功" : "编辑失败",
    });
  } catch (err) {
    console.log(err);
    res.locals.err = err;
    next();
  }
});

module.exports = router;
