import { ODM_MANAGER, mongoConnect } from './odm.manager';
import { odm } from '../app';

export enum Connector {
  MONGO = "MONGO",
  LOWDB = "LOWDB",
}

export class ODM {
  private connector: Connector;
  private DB: any;

  constructor(config) {
    
    switch (true) {
      case config.mongo.enable:
        this.connector = Connector.MONGO;
        mongoConnect();
        break;

      case config.lowdb.enable:
        this.connector = Connector.LOWDB;
        break;

      default:
        throw (new Error('NO DATABASE PROVIDERS SET'));
    }
  }

  public saveRequest = (request): Promise<any> => ODM_MANAGER[this.connector].saveRequest(request);

  public saveResponse = (response): Promise<any> => ODM_MANAGER[this.connector].saveResponse(response);

  public getUUID = (uuid: string): Promise<any> => ODM_MANAGER[this.connector].getUUID(uuid);

  public getAll = (): Promise<any> => ODM_MANAGER[this.connector].getAll();

  public retrieveDatasFromUrlAndMethod = (request): Promise<any> => ODM_MANAGER[this.connector].retrieveDatasFromUrlAndMethod(request);

  public getConnector = (): Connector => this.connector;
}