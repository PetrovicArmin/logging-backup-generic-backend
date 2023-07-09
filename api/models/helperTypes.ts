import { Model } from "sequelize";

// Type `ModelType` would basically wrap & satisfy the 'this' context of any sequelize helper methods
export type Constructor<T> = new (...args: any[]) => T;
export type ModelType<T extends Model<T, any>> = Constructor<T> & typeof Model;