const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';
const client = new MongoClient(url);

async function connectToDatabase() {
    await client.connect();
    console.log('Connected to database');
    return client.db(dbName);
}

// Create
async function createDocument(collectionName, document) {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    console.log('Document inserted:', result.insertedId);
}

// Read
async function readDocuments(collectionName) {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();
    console.log('Documents:', documents);
}

// Update
async function updateDocument(collectionName, filter, update) {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(filter, { $set: update });
    console.log('Document updated:', result.modifiedCount);
}

// Delete
async function deleteDocument(collectionName, filter) {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(filter);
    console.log('Document deleted:', result.deletedCount);
}

async function main() {
    await createDocument('users', { name: 'John', age: 30 });
    await createDocument('users', { name: 'Alice', age: 25 });
    await readDocuments('users');
    await updateDocument('users', { name: 'John' }, { age: 31 });
    await readDocuments('users');
    await deleteDocument('users', { name: 'Alice' });
    await readDocuments('users');
    client.close();
}

main().catch(console.error);
