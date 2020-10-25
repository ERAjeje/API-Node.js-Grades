import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

export async function readJsonFile() {
    try {
        return JSON.parse(await readFile(global.path));
    } catch (err) {
        throw new Error(err);
    }
}

export async function readJsonFileParameter(patch) {
    try {
        return JSON.parse(await readFile(patch));
    } catch (err) {
        throw new Error(err);
    }
}

export async function writeJsonFile(path, data) {
    try {
        await writeFile(path, JSON.stringify(data));
    } catch (err) {
        throw new Error(err);
    }
}