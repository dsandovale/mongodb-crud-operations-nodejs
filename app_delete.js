const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "condominio";
const collection_name = "departamentos"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentToDelete = { _id: ObjectId("63b6ec35386c756ce5bc086a") }

const documentsToDelete = { error: { $lt: 2 } }

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

        let result = await accountsCollection.deleteOne(documentToDelete)
        result.deletedCount === 1
            ? console.log("Deleted one document")
            : console.log("No documents deleted")

        let resultMany = await accountsCollection.deleteMany(documentsToDelete)
        resultMany.deletedCount > 0
            ? console.log(`Deleted ${resultMany.deletedCount} documents`)
            : console.log("No documents deleted")
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`);
    } finally {
        await client.close();
    }
};

main();