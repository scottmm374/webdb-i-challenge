const express = require("express");
const db = require("../../data/dbConfig.js");
const router = express.Router();

// GET ALL ACCOUNTS
// router.get("/", async (req, res, next) => {
//   try {
//     res.json(await db("accounts").select());
//   } catch (err) {
//     next(err);
//   }
// });

// GET ACCOUNT BY ID
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

// POST NEW ACCOUNT
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

// EDIT/UPDATE ACCOUNT
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

//DELETE ACCOUNT
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

// STRETCH

// GET ALL BY DESCENDING BUDGET AMT
// router.get("/", async (req, res, next) => {
//   try {
//     res.json(
//       await db("accounts")
//         .orderBy("budget", "desc")
//         .select()
//     );
//   } catch (err) {
//     next();
//   }
// });

// Get 10 accounts by budget, descending values.
// router.get("/", async (req, res, next) => {
//   try {
//     res.json(
//       await db("accounts")
//         .orderBy("budget", "desc")
//         .limit(10)
//         .select()
//     );
//   } catch (err) {
//     next();
//   }
// });

// GET ALL BUDGETS > 5000.00
// router.get("/", async (req, res, next) => {
//   try {
//     res.json(
//       await db("accounts")
//         .where("budget", ">", 5000.0)
//         .select()
//     );
//   } catch (err) {
//     next();
//   }
// });

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
