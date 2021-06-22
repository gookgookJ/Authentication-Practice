const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = {
  signin: async (req, res) => {
    await Users.findeOne({
      where: {
        userId: req.body.userId,
        userPassword: req.body.userPassword,
      },
    }).then((result) => {
      const { ACCESS_SOLT } = process.env;
      const { REFRESH_SOLT } = process.env;

      const accessToken = jwt.sign(
        {
          userData: result.dataValues,
        },
        ACCESS_SOLT,
        {
          expiresIn: "10s",
        }
      );
      const refreshToken = jwt.sign(
        {
          userData: result.dataValues,
        },
        REFRESH_SOLT,
        {
          expiresIn: "2d",
        }
      );
      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 2,
          httpOnly: true,
        })
        .cookie("accessToken", accessToken, {
          maxAge: 1000 * 10,
          httpOnly: true,
        })
        .send({ message: "성공적으로 로그인이 완료 되었습니다." });
    });
  },

  signup: async (req, res) => {
    const userInfo = await Users.findOne({
      where: { userId: req.body.userId },
    });

    if (userInfo) {
      res.status(409).send("가입 된 정보가 있습니다.");
    } else {
      Users.create({
        userId: req.body.userId,
        userPassword: req.body.userPassword,
        userName: req.body.userName,
        nickname: req.body.nickname,
      })
        .then((result) => {
          res.status(201).send({
            userInfo: result,
            message: "성공적으로 가입이 완료되었습니다",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  signout: async (req, res) => {},
};
