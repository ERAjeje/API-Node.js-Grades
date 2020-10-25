import express from "express";
import {readJsonFile} from "../utils/fileManager.js";

const bigger = express();

bigger.use(express.json());

bigger.get("/", async (req, res, next) => {
    const params = req.body;
    try {
        if (!params.type || !params.subject)
            throw new Error("Os parametros bigger e subjetct são obrigatórios.");
        const data = await readJsonFile();
        let result = data.grades.filter(grade => (
            params.type === grade.type && params.subject === grade.subject)
        );
        result = result.sort((a, b) => {
            return b.value - a.value;
        });
        result = result.slice(0,3);
        res.send(result);
    } catch (e) {
        next(e);
    }
})

bigger.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message });
});

export default bigger;
