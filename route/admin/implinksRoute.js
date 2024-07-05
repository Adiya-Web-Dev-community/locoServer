const express = require("express");
const router = express.Router();
const { isAdmin } = require("../../middleware/rolebaseuserValidate");
const {Create,getAll,Update,Delete}=require("../../controller/admin/implinks.Controller")
router.post("/important_link/create",isAdmin,Create);
router.get("/important_link",isAdmin,getAll);
router.put("/important_link/:id",isAdmin,Update);
router.delete("/important_link/:id",isAdmin,Delete);

module.exports = router;
