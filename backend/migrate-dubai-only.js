const { MongoClient } = require('mongodb');

const atlasUri = 'mongodb+srv://contactnetpiedev_db_user:20KC3X3UJqYFC2bO@cluster0.rtyuckp.mongodb.net/?appName=Cluster0';
const vpsUri = 'mongodb://travel2d_travel2dubai:travel2dubai@103.138.96.92:27017/travel2d_travel2dubai?authSource=travel2d_travel2dubai';

async function migrateDubaiOnly() {
  const atlasClient = new MongoClient(atlasUri);
  const vpsClient = new MongoClient(vpsUri);

  try {
    console.log('Connecting to Atlas source...');
    await atlasClient.connect();

    console.log('Connecting to VPS target...');
    await vpsClient.connect();

    const targetDb = vpsClient.db('travel2d_travel2dubai');
    const sourceDb = atlasClient.db('dubai');

    console.log('\n========================================');
    console.log(' CLEANING TARGET DB (travel2d_travel2dubai)');
    console.log('========================================\n');

    const existingCols = await targetDb.listCollections().toArray();
    for (const col of existingCols) {
      await targetDb.collection(col.name).drop();
      console.log(`  - Dropped collection "${col.name}"`);
    }

    console.log('\n========================================');
    console.log(' MIGRATING ONLY "dubai" DATABASE FROM ATLAS');
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
      await targetCol.insertMany(docs);
      totalMigrated += docs.length;
      console.log(`  ✓ Collection "${colName}": ${docs.length} documents migrated`);
    }

    console.log('\n========================================');
    console.log(' FINAL VERIFICATION OF travel2d_travel2dubai');
    console.log('========================================\n');

    const finalCols = await targetDb.listCollections().toArray();
    let verifiedTotal = 0;

    for (const col of finalCols) {
      const count = await targetDb.collection(col.name).countDocuments();
      verifiedTotal += count;
      console.log(`  - ${col.name.padEnd(20)} : ${count} documents`);
    }

    console.log(`\nGrand Total Documents: ${verifiedTotal}`);
    console.log('\n✅ DEDICATED "dubai" MIGRATION COMPLETED!');

  } catch (error) {
    console.error('❌ Migration Error:', error);
  } finally {
    await atlasClient.close();
    await vpsClient.close();
  }
}

migrateDubaiOnly();
