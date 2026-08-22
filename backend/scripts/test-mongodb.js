const mongoose = require('mongoose');

/**
 * MongoDB Connection Test Script
 * Usage:
 *   node scripts/test-mongodb.js "mongodb://travel2d_travel2dubai:YOUR_PASSWORD@127.0.0.1:27017/travel2d_travel2dubai?authSource=travel2d_travel2dubai"
 *   OR set environment variable MONGODB_URI
 */

async function testConnection() {
  let uri = process.argv[2] || process.env.MONGODB_URI;

  if (!uri) {
    uri = 'mongodb://travel2d_travel2dubai:travel2dubai@127.0.0.1:27017/travel2d_travel2dubai?authSource=travel2d_travel2dubai';
  }

  // Check if user forgot to replace YOUR_PASSWORD
  if (uri.includes('YOUR_PASSWORD')) {
    console.warn('\n⚠️ WARNING: The URI contains "YOUR_PASSWORD". Replace "YOUR_PASSWORD" with the actual password before running.\n');
  }

  // Mask password for logging
  const maskedUri = uri.replace(/:([^:@]+)@/, ':*****@');
  console.log(`[+] Attempting to connect to MongoDB: ${maskedUri}`);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      connectTimeoutMS: 5000,
    });

    console.log('✅ Connection SUCCESSFUL!');
    const db = mongoose.connection.db;
    console.log(`[+] Connected Database Name: "${db.databaseName}"`);

    // List collections to verify read access
    const collections = await db.listCollections().toArray();
    console.log(`[+] Collections count: ${collections.length}`);
    if (collections.length > 0) {
      console.log('[+] Existing collections:', collections.map(c => c.name).join(', '));
    } else {
      console.log('[+] Database currently has no collections.');
    }

    await mongoose.disconnect();
    console.log('[+] Connection closed cleanly.\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection FAILED!');
    console.error(`[!] Error Code: ${error.code || 'UNKNOWN'}`);
    console.error(`[!] Error Message: ${error.message}\n`);

    if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Recommendation: MongoDB service is not running on 127.0.0.1:27017 locally, or port 27017 is blocked.');
      console.error('   If MongoDB is on VPS (103.138.96.92), run this script directly on the VPS or use an SSH tunnel:');
      console.error('   ssh -L 27017:127.0.0.1:27017 root@103.138.96.92\n');
    } else if (error.message.includes('Authentication failed') || error.code === 18) {
      console.error('💡 Recommendation: The username or password is incorrect, or the authSource database is invalid.\n');
    }

    process.exit(1);
  }
}

testConnection();
