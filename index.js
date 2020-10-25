import express from "express";
import {readJsonFile, writeJsonFile, readJsonFileParameter } from "./utils/fileManager.js";
import gradesRotes from "./rotes/routes.js";
import studentRotes from "./rotes/students.js";
import mediaRotes from "./rotes/media.js";
import biggerRotes from "./rotes/bigger.js";
import winston from "winston";

global.path = "grades.json"
const app = express();

app.use(express.json());
app.use("/grades", gradesRotes);
app.use("/student", studentRotes);
app.use("/media", mediaRotes);
app.use("/bigger", biggerRotes);

const { combine, timestamp, label, printf } = winston.format;

const formatMyLog = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "grades-api.log" })
    ],
    format: combine(
        label({ label: "grades-api" }),
        timestamp(),
        formatMyLog
    )
});

app.listen(3000, async () => {
    try {
        await readJsonFile();
        logger.info("API Started.")
    } catch (e) {
        const data = await readJsonFileParameter("./utils/bd.json");
        if(data !== null)
            await writeJsonFile(global.path, data);
        logger.info("API Started and file created.")
    }
})