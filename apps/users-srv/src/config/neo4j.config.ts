import neo4j from 'neo4j-driver';
import { appConfig } from './app.config';
export const neo4jDriver = neo4j.driver(
  appConfig.NEO4J_URI,
  neo4j.auth.basic(appConfig.NEO4J_USERNAME, appConfig.NEO4J_PASSWORD)
);


export const connectToNeo4j = async () => neo4jDriver;