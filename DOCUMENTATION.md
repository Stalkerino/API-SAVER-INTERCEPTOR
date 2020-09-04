# API SAVER 2.0

Welcome to the documentation of the API Saver.
In this documentation you will find :

 - How to create a config File
 - How to use an Interceptor (Angular 2 and Angular 4.3+)
 - How to add a new Database Manager

# Configuration

The configuration file must be at the root directory of the project

You have to enable ONE (and only one) database manager, otherwise, the mongo will be the default one if both are enabled, and the API will crash if none is enabled.

api.config.json :
```json 
{
  "config": {
    "secret": "SECRET_KEY",
    "api": {
      "ip": "127.0.0.1",
      "port": 3001
    },
    "mongo": {
      "ip": "127.0.0.1",
      "port": 27017,
      "base_name": "api-saver",
      "enable": false
    },
    "lowdb": {
      "filename": "bdd.json",
      "enable": true
    },
    "limit": "5mb"
  }
}
```

# Interceptors

## Angular 4.3 +

Put the interceptor inside the src folder, and import it inside the app.module in the providers :  
`{ provide: HTTP_INTERCEPTORS, useClass: ApiSaverInterceptor, multi: true }`

---

## Angular 2 -> 4.2
Put the interceptor inside the src folder, and import it inside the app.module in the providers :  
Add this code inside app.module :  

```typescript 
export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions) {
  let service = new InterceptorService(xhrBackend, requestOptions);
  // Add interceptors here with service.addInterceptor(interceptor)
  service.addInterceptor(new ServerURLInterceptor());
  return service;
}
```

And add that inside the providers :  
```typescript
{
  provide: InterceptorService,
  useFactory: interceptorFactory,
  deps: [XHRBackend, RequestOptions]
},
provideInterceptorService([
  new ServerURLInterceptor()
]),
{
  provide: Http,
  useFactory: interceptorFactory,
  deps: [XHRBackend, RequestOptions]
}
```
  
You need to install :  
`npm i axios uuid ng2-interceptors`

# Add a new Database to the ODM Manager

To add a new database, you need to add a new entry in the ODM_MANAGER object, and respect the interface :

```typescript
interface COMMANDS {
  saveRequest: Function,
  saveResponse: Function,
  getUUID: Function,
  getAll: Function,
  retrieveDatasFromUrlAndMethod: Function
};

interface ODM_MANAGERI {
  LOWDB: COMMANDS,
  MONGO: COMMANDS
};
```

In this exemple, we will fake the add of MYSQL.

1. Add MYSQL to the Connector enum inside ODM/odm.connector.ts, and remember of what you typed, you'll need it to create all the methods at the step 3, 4.
```typescript
export enum Connector {
  MONGO = "MONGO",
  LOWDB = "LOWDB",
  MYSQL = "MYSQL"
}
```

2. Add into the config file entry options, like that for exemple :
```json 
{
  "config": {
    "mongo": { ... },
    "lowdb": { ... },
    "mysql": { ALL ENTRY AND OPTIONS TO HANDLE }
    "limit": "5mb"
  }
}
```

3. I had the MYSQL entry into the ODM_MANAGERI like so :
```typescript
interface ODM_MANAGERI {
  LOWDB: COMMANDS,
  MONGO: COMMANDS,
  MYSQL: COMMANDS
};
```

4. Add all the methods needed inside a new entry MYSQL inside the ODM_MANAGER object like so :
```typescript
export const ODM_MANAGER: ODM_MANAGERI = {
  LOWDB: { ... },
  MONGO: { ... },
  MYSQL: { SEE INTERFACE ODM_MANAGERI => COMMANDS }
```

Make sure to always send Promises with the right format, you can check the other ODM to see how to respond (WIP Documentation, TODO: create and print all the interfaces to make this part easier)

5. Inside the ODM/odm.connector.ts, check in the constructor by adding a way to identify MYSQL
```typescript
switch (true) {
      case config.mongo.enable:
        this.connector = Connector.MONGO;
        mongoConnect();
        break;

      case config.lowdb.enable:
        this.connector = Connector.LOWDB;
        break;

      case config.mongo.enable:
        this.connector = Connector.MYSQL

      default:
        throw (new Error('NO DATABASE PROVIDERS SET'));
    }
```

And VOILA, you have a new DB that can be handled by this API.