const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "condominio";
const collection_name = "departamentos"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentToUpdate = { _id: ObjectId("63b6dcfa35a5ec18acbd378a") }
const update = { $inc: { saldo_contra: 68590, saldo_final: 68590 } }

const documentsToUpdate = { servicio_gas: false };
const updates = { $push: { check_gas: new Date() } }

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Conectado a la base ${dbname}`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos ${dbname}: ${error}`);
    }
};

const main = async() => {
    try {
        await connectToDatabase();

        let result = await accountsCollection.updateOne(documentToUpdate, update)
        result.modifiedCount === 1
        ? console.log("Updated one document")
        : console.log("No documents updated")

        let resultMany = await accountsCollection.updateMany(documentsToUpdate, updates)
        resultMany.modifiedCount > 0
        ? console.log(`Updated ${result.modifiedCount} documents`)
        : console.log("No documents updated")
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`);
    } finally {
        await client.close();
    }
};

main();