const express = require("express");
const db = require("../../data/dbConfig.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await db("accounts").select());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateAccountsId, async (req, res, next) => {
  try {
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .select()
    );
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    await db("accounts")
      .where("id", req.params.id)
      .insert(payload);
    res.json(
      await db("accounts")
        .where("id", id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateAccountsId, async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };

    await db("accounts")
      .where("id", req.params.id)
      .update(payload);
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateAccountsId, async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Middleware
async function validateAccountsId(req, res, next) {
  try {
    const accounts = await db("accounts")
      .where("id", req.params.id)
      .first();
    if (accounts) {
      next();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = router;
