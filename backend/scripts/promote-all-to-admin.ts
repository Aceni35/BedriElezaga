import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from '../src/models/User.js';

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not set');

  await mongoose.connect(uri);
  const result = await User.updateMany({}, { $set: { role: 'admin' } });
  console.log(`Matched ${result.matchedCount}, modified ${result.modifiedCount}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
