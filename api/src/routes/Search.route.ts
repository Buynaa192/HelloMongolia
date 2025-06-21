import { Router } from "express";
import { unifiedSearch } from "../controllers/SearchAll";

export const searchRouter = Router().get("/", unifiedSearch);
