import mongoose from 'mongoose';
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });

    console.log('[app]: MongoDB connected...')
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}