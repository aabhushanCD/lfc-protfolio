import express from "express";

import { register } from "../controller/register.controller.ts";
import { login } from "../controller/login.controller.ts";
import { validate } from "../../../shared/middleware/validation.middleware.ts";
import { createUserSchema } from "../schema/createUser.schema.ts";
import { loginUserSchema } from "../schema/loginUser.schema.ts";
import { logout } from "../controller/logout.controller.ts";

export const authRoutes = express.Router();

authRoutes.post("/register", validate(createUserSchema), register);
authRoutes.post("/login", validate(loginUserSchema), login);
authRoutes.post("/logout", logout);
