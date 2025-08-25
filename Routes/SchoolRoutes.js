import express from 'express';
import async_func from '../Utils/asyn_func.js';
import { addSchool, listSchool } from '../Controllers/SchoolControllers.js';
import validateSchool from '../Middlewares/validateSchool.js';

const router=express.Router();


router.post("/addSchool",validateSchool,async_func(addSchool));

router.get("/listSchools",async_func(listSchool));

export default router;