import { Router } from "express";
import { loginUser, register } from "./auth.controller.ts";
import { createAuthSchema } from "./schema/auth.schema.ts";
import { validate } from "../../middleware/validation.middleware.ts";

const router = Router();

router.post("/login", validate(createAuthSchema), loginUser);
router.post("/signup", validate(createAuthSchema), register);

export default router;
