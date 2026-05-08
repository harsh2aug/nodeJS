const { MongoClient } = require("mongodb");
require("dotenv").config();


const client = new MongoClient(process.env.MONGO_URI);

async function main() {
    await client.connect();

    console.log("Connected to MongoDB");

    const db = client.db("HelloWorld");

    const collection = db.collection("User");

    /* Read */
    const data = await collection.find().toArray();

    console.log(data);

    /* Update */
    // const updateResult = await collection.updateOne({ firstName: "Vani" }, { $set: { age: 24 } })
    // console.log(updateResult);

    /* Delete */
    // const deleteResult = await collection.deleteMany({ firstName: "Vani" });
    // console.log('Deleted documents =>', deleteResult);

    /* Insert */
    // const insertResult = await collection.insertOne({ firstName: "Vivek", lastName: "Yadav", age: 30, city: 'Meerut', phoneNumber: 7895648208, })
    // console.log(insertResul t)


    // console.log(data)

    // const countResult = await collection.countDocuments({})
    // console.log("countResult => ", countResult);

    return "done";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());