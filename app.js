const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "condominio";
const collection_name = "departamentos"

const accountsCollection = client.db(dbname).collection(collection_name)

const departamento = {
    direccion: "Cruz 1469 Departamento 31",
    numeracion_interna: 31,
    propietario: "Esteban Donoso",
    propietario_id: 97,
    arrendatario: null,
    arrendatario_id: null,
    modelo_departamento: null,
    saldo_favor: 1247,
    saldo_contra: 0,
    saldo_final: -1247,
    servicio_gas: false,
    servicio_agua: true,
    servicio_luz: true,
    estacionamiento_vehiculo: {
        servicio_estacionamiento: true,
        ultimo_pago: new Date(),
        numero_estacionamiento: 13
    },
    bicicletero: {
        servicio_bicicletero: false,
        ultimo_pago: new Date(),
        cantidad_bicicletas: 2
    },
    estacionamiento_motocicleta: {
        servicio_motocicleta: true,
        ultimo_pago: new Date(),
        numero_estacionamiento: 4
    }
};

const departamentos = [
    {
        direccion: "Cruz 1469 Departamento 30",
        numeracion_interna: 30,
        propietario: "Rosa Morales Jeria",
        propietario_id: 43,
        arrendatario: null,
        arrendatario_id: null,
        modelo_departamento: null,
        saldo_favor: 0,
        saldo_contra: 34500,
        saldo_final: 34500,
        servicio_gas: false,
        servicio_agua: true,
        servicio_luz: true,
        estacionamiento_vehiculo: {
            servicio_estacionamiento: null,
            ultimo_pago: null,
            numero_estacionamiento: 0
        },
        bicicletero: {
            servicio_bicicletero: false,
            ultimo_pago: null,
            cantidad_bicicletas: 0
        },
        estacionamiento_motocicleta: {
            servicio_motocicleta: false,
            ultimo_pago: null,
            numero_estacionamiento: 0
        }
    },
    {
        direccion: "Cruz 1469 Departamento 32",
        numeracion_interna: 32,
        propietario: "Dominique Egro",
        propietario_id: 12,
        arrendatario: "Camila R. Noguera",
        arrendatario_id: 34,
        modelo_departamento: null,
        saldo_favor: 0,
        saldo_contra: 0,
        saldo_final: 0,
        servicio_gas: true,
        servicio_agua: true,
        servicio_luz: true,
        estacionamiento_vehiculo: {
            servicio_estacionamiento: null,
            ultimo_pago: null,
            numero_estacionamiento: 0
        },
        bicicletero: {
            servicio_bicicletero: false,
            ultimo_pago: null,
            cantidad_bicicletas: 0
        },
        estacionamiento_motocicleta: {
            servicio_motocicleta: true,
            ultimo_pago: new Date(),
            numero_estacionamiento: 2
        }
    }
]

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
        if(!many){
            let result = await accountsCollection.insertOne(departamento)
            console.log(`Inserted document: ${result.insertedId}`)
        }else{
            let result = await accountsCollection.insertMany(departamentos)
            console.log(`Inserted ${result.insertedCount} documents`)
        }
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error}`);
    } finally {
        await client.close();
    }
};

main(true);