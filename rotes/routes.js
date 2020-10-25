import express from "express";
import { readJsonFile, writeJsonFile } from "../utils/fileManager.js";

const routes = express();

routes.use(express.json());

routes.get("/", async (req, res, next) => {
    try {
        const data = await readJsonFile();
        res.send(data.grades);
    } catch (e) {
        next(e);
    }
});

routes.get("/:id", async (req, res, next) => {
    try {
        const data = await readJsonFile();
        const index = data.grades.findIndex(field => field.id === parseInt(req.params.id));
        console.log("entrou errado")
        if (index === -1)
            throw new Error("Id não encontrado.");
        const grade = data.grades.filter(field => field.id === parseInt(req.params.id));
        res.send(grade);
    } catch (e) {
      next(e);
    }
});

routes.post("/", async (req, res, next) => {
    try {
        let params = req.body;
        if (!params.subject || !params.student || !params.type || !params.value)
            throw new Error("Campos obrigatórios ausentes.")
        const data = await readJsonFile();
        const timestamp = new Date();
        params = {
            "id": data.nextId++,
            "student": params.student,
            "subject": params.subject,
            "type": params.type,
            "value": params.value,
            "timestamp": timestamp
        };
        data.grades.push(params);
        await writeJsonFile(global.path, data);
        res.send(params);
    } catch (e) {
        next(e);
    }
});

routes.put("/", async (req, res, next) => {
    const params = req.body;
    try {
        const data = await readJsonFile();
        if (!params.id || !params.subject || !params.student || !params.type || !params.value)
            throw new Error("Campos obrigatórios ausentes.")
        const index = data.grades.findIndex(grade => grade.id === parseInt(params.id));
        if(index === -1)
            throw new Error("Nenhum registro encontrado para o Id informado.")
        data.grades[index].student = params.student;
        data.grades[index].subject = params.subject;
        data.grades[index].type = params.type;
        data.grades[index].value = params.value;
        data.grades[index].timestamp = params.timestamp;

        await writeJsonFile(global.path, data);
        res.send(data.grades[index]);
    } catch (e) {
        next(e);
    }
});

routes.patch("/", async (req, res, next) => {
    const params = req.body;
    try {
        const data = await readJsonFile();
        if (!params.id)
            throw new Error("O campo Id é obrigatório.")
        const index = data.grades.findIndex(grade => grade.id === parseInt(params.id));
        if(index === -1)
            throw new Error("Nenhum registro encontrado para o Id informado.")
        for (var key in params){
            if (key != "id" && (key == "student" || key == "subject" ||
                key == "type" || key == "value" || key == "timestamp"))
                data.grades[index][key] = params[key];
        }
        await writeJsonFile(global.path, data)
        res.send(data.grades[index]);
    } catch (e) {
        next(e);
    }
});

routes.delete("/:id", async (req, res, next) => {
    try {
        if (!req.params.id)
            throw new Error("O parametro Id é obrigatório.");
        const data = await readJsonFile();
        const index = data.grades.findIndex(grade => grade.id === parseInt(req.params.id));
        if(index === -1)
            throw new Error("Nenhum registro encontrado para o Id informado.")
        data.grades = data.grades.filter(grade => grade.id !== parseInt(req.params.id));
        await writeJsonFile(global.path, data);
        res.end();
    } catch (e) {
        next(e);
    }
});

routes.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message });
});

export default routes;