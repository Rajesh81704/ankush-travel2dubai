const { MongoClient } = require('mongodb');

const atlasUri = 'mongodb+srv://contactnetpiedev_db_user:20KC3X3UJqYFC2bO@cluster0.rtyuckp.mongodb.net/?appName=Cluster0';
const localVpsUri = 'mongodb://travel2d_travel2dubai:travel2dubai@127.0.0.1:27017/travel2d_travel2dubai?authSource=travel2d_travel2dubai';

async function restoreDubaiOnly() {
  const atlasClient = new MongoClient(atlasUri);
  const vpsClient = new MongoClient(localVpsUri);

  try {
    console.log('Connecting to MongoDB Atlas source...');
    await atlasClient.connect();

    console.log('Connecting to local VPS MongoDB target (127.0.0.1)...');
    await vpsClient.connect();

    const targetDb = vpsClient.db('travel2d_travel2dubai');
    const sourceDb = atlasClient.db('dubai');

    console.log('\n========================================');
    console.log(' RESTORING "dubai" DATABASE FROM ATLAS');
    console.log('========================================\n');

    const collections = await sourceDb.listCollections().toArray();
    let totalMigrated = 0;

    for (const colInfo of collections) {
      const colName = colInfo.name;
      const sourceCol = sourceDb.collection(colName);
      const docs = await sourceCol.find({}).toArray();

      if (docs.length === 0) {
        console.log(`  - Collection "${colName}": 0 documents (skipped)`);
        continue;
      }

      const targetCol = targetDb.collection(colName);
      await targetCol.deleteMany({});
      await targetCol.insertMany(docs);
      totalMigrated += docs.length;
      console.log(`  ✓ Collection "${colName}": ${docs.length} documents restored`);
    }

    console.log('\n========================================');
    console.log(' VERIFYING RESTORED TARGET DB COUNTS');
    console.log('========================================\n');

    const finalCols = await targetDb.listCollections().toArray();
    let verifiedTotal = 0;

    for (const col of finalCols) {
      const count = await targetDb.collection(col.name).countDocuments();
      verifiedTotal += count;
      console.log(`  - ${col.name.padEnd(20)} : ${count} documents`);
    }

    console.log(`\nGrand Total Documents Restored: ${verifiedTotal}`);
    console.log('\n✅ RESTORATION COMPLETED SUCCESSFULLY!');

  } catch (error) {
    console.error('❌ Restoration Error:', error);
  } finally {
    await atlasClient.close();
    await vpsClient.close();
  }
}

restoreDubaiOnly();
