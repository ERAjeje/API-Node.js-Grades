import express from "express";
import {readJsonFile} from "../utils/fileManager.js";

const student = express();

student.use(express.json());

student.get("/", async (req, res, next) => {
    const params = req.body;
    try {
        if (!params.student || !params.subject)
            throw new Error("Os parametros student e subjetct são obrigatórios.");
        const data = await readJsonFile();
        const result = data.grades.filter(grade => (
            params.student === grade.student && params.subject === grade.subject)
        );
        if(result.length === 0)
            throw new Error("Student e/ou Subject não encontrados.")
        const value = result.reduce((acc, prox) => {
            return acc + prox.value;
        },0);
        const resp = {
            "total": value,
            "array": result
        };
        res.send(resp);
    } catch (e) {
        next(e);
    }
})

student.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message });
});

export default student;
