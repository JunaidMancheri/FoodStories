import {connect} from 'mongoose';

export async function connectToMongoDB(uri: string) {
  await connect(uri);
}