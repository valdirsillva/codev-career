declare namespace NodeJS {
  export interface ProcessEnv {
    FOOD_DATA_TEXT: string;
    FOOD_DATASET: string;
    CLUSTER_DBMONGO_ATLAS: string | undefined;
  }
}