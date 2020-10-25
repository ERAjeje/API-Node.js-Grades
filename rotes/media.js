import express from "express";
import {readJsonFile} from "../utils/fileManager.js";

const media = express();

media.use(express.json());

media.get("/", async (req, res, next) => {
    const params = req.body;
    try {
        if (!params.type || !params.subject)
            throw new Error("Os parametros media e subjetct são obrigatórios.");
        const data = await readJsonFile();
        const result = data.grades.filter(grade => (
            params.type === grade.type && params.subject === grade.subject)
        );
        const value = result.reduce((acc, prox) => {
            return acc + prox.value;
        },0);
        const resp = {
            "média": value/result.length,
            "array": result
        };
        res.send(resp);
    } catch (e) {
        next(e);
    }
})

media.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message });
});

export default media;
