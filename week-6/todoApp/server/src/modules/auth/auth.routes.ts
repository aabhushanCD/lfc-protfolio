import { Router } from "express";
import { loginUser, register } from "./auth.controller.ts";
import { createAuthSchema } from "./schema/auth.schema.ts";
import { validate } from "../../middleware/validation.middleware.ts";
import { loginAuthSchema } from "./schema/loginAuthSchema.ts";

const router = Router();

router.post("/login", validate(loginAuthSchema), loginUser);
router.post("/signup", validate(createAuthSchema), register);

export default router;
