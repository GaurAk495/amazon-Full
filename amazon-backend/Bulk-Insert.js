import { MongoClient } from "mongodb";
import { readFile } from "fs/promises";

const MONGO_URI = "mongodb+srv://justemail594:tWHyvXUhWloYE7Gn@cluster0.jysbtmb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Change if using Atlas
const DB_NAME = "amazon";
const COLLECTION_NAME = "ships";
const FILE_PATH = "./data/delivery.json"; // Path to JSON file

async function importData() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const rawData = await readFile(FILE_PATH, "utf-8");
    const docs = JSON.parse(rawData);

    const BATCH_SIZE = 1000;
    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
        const batch = docs.slice(i, i + BATCH_SIZE);
        await collection.insertMany(batch);
    }

    console.log("Import completed.");
    await client.close();
}
importData()