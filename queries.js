const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('nome_del_tuo_database');
        const collection = database.collection('nome_della_tua_collezione');


        const query1 = await collection.find({ isActive: true }).toArray();
        console.log('Query 1 Result:', query1.length);


        const query2 = await collection.find({ age: { $gt: 26 } }).toArray();
        console.log('Query 2 Result:', query2.length);


        const query3 = await collection.find({ age: { $gt: 26, $lte: 30 } }).toArray();
        console.log('Query 3 Result:', query3.length);


        const query4 = await collection.find({ eyeColor: { $in: ['brown', 'blue'] } }).toArray();
        console.log('Query 4 Result:', query4.length);

   
        const query5 = await collection.find({ eyeColor: { $ne: 'green' } }).toArray();
        console.log('Query 5 Result:', query5.length);


        const query6 = await collection.find({ eyeColor: { $nin: ['green', 'blue'] } }).toArray();
        console.log('Query 6 Result:', query6.length);

        const query7 = await collection.find({ company: 'FITCORE' }, { projection: { email: 1, _id: 0 } }).toArray();
        console.log('Query 7 Result:', query7);

    } finally {
        await client.close();
    }
}

main().catch(console.error);