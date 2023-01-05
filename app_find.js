const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "condominio";
const collection_name = "departamentos"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentsToFind = { saldo_final: { $gt: 0 } }
const documentToFind = { _id: ObjectId("63b6dcfa35a5ec18acbd378a") }

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Conectado a la base ${dbname}`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos ${dbname}: ${error}`);
    }
};

const main = async(many) => {
    try {
        await connectToDatabase();

        //Busca un documento específico
        let resultOne = await accountsCollection.findOne(documentToFind)
        console.log(resultOne)

        //Busca todo lo que tenga coincidencias.
        let result = accountsCollection.find(documentsToFind)
        let docCount = accountsCollection.countDocuments(documentsToFind)
        await result.forEach((doc) => console.log(doc))
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`);
    } finally {
        await client.close();
    }
};

main();