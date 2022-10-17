const express = require("express");
const router = express.Router();
const { query, body, validationResult } = require("express-validator");
const adminsDao = require("../dao/adminDao.js");

const rules = [
  body("account")
    .trim()
    .exists()
    .withMessage("account是必填属性")
    .bail()
    .isLength({ min: 5, max: 20 })
    .withMessage("长度必须在5到20之间"),
  body("password")
    .trim()
    .exists()
    .withMessage("password属性是必填的")
    .bail()
    .isLength({ min: 5, max: 20 })
    .withMessage("长度必须在5到20之间"),
];

router.post("/login.do", ...rules, async (req, res, next) => {
  const errors = validationResult(req); // 验证数据是否符合规则
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }
  // try {
  let loginBean = await adminsDao.login(req.body);
  if (loginBean) {
    const token = res.app.locals.jwt.sign(
      {
        // id: loginBean.id,
        account: loginBean.account,
      },
      res.app.locals.secretKey,
      {
        expiresIn: "1days",
      }
    );
    res.json({
      code: 200,
      tokenHeader: "Bearer ",
      token,
    });
  } else {
    res.json({
      code: 500,
      message: "登录失败，账号或密码错误",
    });
  }
  // } catch (err) {
  //   console.log(err)
  //   res.locals.err = err;
  //   next();
  // }
});

module.exports = router;
