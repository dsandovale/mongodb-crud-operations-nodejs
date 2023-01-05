const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");
const transacciones = require("./datafile");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "condominio";
const collection_name = "transacciones"

const transaccionesCollection = client.db(dbname).collection(collection_name)

const main = async(many) => {
    try {
        await client.connect()
        let result = await transaccionesCollection.insertMany(transacciones)
        console.log(`Inserted ${result.insertedCount} documents`)
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`);
    } finally {
        await client.close();
    }
};

main();