const express = require("express");
const { authMiddleware } = require("../middleware.js");
const { Account } = require("../db.js");

const mongoose = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  console.log(account);
  res.status(200).json({
    message: "Balance fetched successfully",
    balance: Math.ceil(account.balance * 100) / 100, // Rounds up to 2 decimal places
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  // create a session
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.find({
    userId: req.userId,
  });

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });
  if (!toAccount) {
    await session.abortTransaction();
    res.status(400).json({
      message: "The recepient account is not valid",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: +amount,
      },
    }
  ).session(session);

  await session.commitTransaction();
  res.status(200).json({
    message: "Transfer is successfull",
  });
});

module.exports = router;
