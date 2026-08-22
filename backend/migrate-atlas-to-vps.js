const { MongoClient } = require('mongodb');

const atlasUri = 'mongodb+srv://contactnetpiedev_db_user:20KC3X3UJqYFC2bO@cluster0.rtyuckp.mongodb.net/?appName=Cluster0';
const vpsUri = 'mongodb://travel2d_travel2dubai:travel2dubai@103.138.96.92:27017/travel2d_travel2dubai?authSource=travel2d_travel2dubai';

async function migrate() {
  const atlasClient = new MongoClient(atlasUri);
  const vpsClient = new MongoClient(vpsUri);

  try {
    console.log('Connecting to MongoDB Atlas source...');
    await atlasClient.connect();

    console.log('Connecting to VPS MongoDB target...');
    await vpsClient.connect();

    const targetDb = vpsClient.db('travel2d_travel2dubai');
    const sourceDbNames = ['travel', 'dubai', 'triptour'];

    console.log('\n========================================');
    console.log(' STARTING DATA MIGRATION FROM ATLAS TO VPS');
    console.log('========================================\n');

    for (const dbName of sourceDbNames) {
      console.log(`\n---> Migrating database: "${dbName}"`);
      const sourceDb = atlasClient.db(dbName);
      const collections = await sourceDb.listCollections().toArray();

      for (const colInfo of collections) {
        const colName = colInfo.name;
        const sourceCol = sourceDb.collection(colName);
        const docs = await sourceCol.find({}).toArray();

        if (docs.length === 0) continue;

        const targetCol = targetDb.collection(colName);
        let insertedCount = 0;
        let updatedCount = 0;
        let skippedCount = 0;

        for (const doc of docs) {
          try {
            // First attempt to match by _id
            const existingById = await targetCol.findOne({ _id: doc._id });

            if (existingById) {
              await targetCol.replaceOne({ _id: doc._id }, doc);
              updatedCount++;
            } else {
              // Try inserting new doc
              await targetCol.insertOne(doc);
              insertedCount++;
            }
          } catch (err) {
            if (err.code === 11000) {
              // Unique index conflict: try updating matched unique document
              try {
                if (colName === 'visapackages' && doc.country) {
                  await targetCol.updateOne({ country: doc.country }, { $set: doc });
                  updatedCount++;
                } else if ((colName === 'users' || colName === 'admins') && doc.email) {
                  await targetCol.updateOne({ email: doc.email }, { $set: doc });
                  updatedCount++;
                } else {
                  skippedCount++;
                }
              } catch (innerErr) {
                skippedCount++;
              }
            } else {
              console.error(`  Warning in "${colName}":`, err.message);
              skippedCount++;
            }
          }
        }

        console.log(`  ✓ Collection "${colName}": ${docs.length} docs (${insertedCount} new, ${updatedCount} updated, ${skippedCount} skipped due to duplicates)`);
      }
    }

    console.log('\n========================================');
    console.log(' VERIFYING FINAL TARGET DB COUNTS');
    console.log('========================================\n');

    const finalCols = await targetDb.listCollections().toArray();
    let grandTotal = 0;
    for (const col of finalCols) {
      const count = await targetDb.collection(col.name).countDocuments();
      grandTotal += count;
      console.log(`  - ${col.name.padEnd(20)} : ${count} documents`);
    }
    console.log(`\nTotal Documents in travel2d_travel2dubai: ${grandTotal}`);
    console.log('\n✅ MIGRATION COMPLETED SUCCESSFULLY!');

  } catch (error) {
    console.error('❌ Migration Error:', error);
  } finally {
    await atlasClient.close();
    await vpsClient.close();
  }
}

migrate();
