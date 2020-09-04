import { Request as RequestM } from "../schemas/requests.schema";
import { Response as ResponseM } from "../schemas/responses.schema";
import lowdb from "lowdb";
import FileSync = require("lowdb/adapters/FileSync");
import { CONFIG } from "../app";
import mongoose from "mongoose";

interface COMMANDS {
  saveRequest: Function;
  saveResponse: Function;
  getUUID: Function;
  getAll: Function;
  retrieveDatasFromUrlAndMethod: Function;
}

interface ODM_MANAGERI {
  LOWDB: COMMANDS;
  MONGO: COMMANDS;
}

interface GetAllI {
  
}

const DB = lowdb(new FileSync(CONFIG.lowdb.filename));
DB.defaults({
  responses: [
    {
      "statusCode": 200,
      "body": [
        {
          "postCode": "94350",
          "town": "VILLIERS SUR MARNE",
          "cityId": "079",
          "codeInseeDept": "94",
          "description": "VILLIERS SUR MARNE"
        }
      ],
      "uuid": "TOWN-c76e-11ea-9bb8-afcd9ab06c4e"
    },
    {
      "statusCode": 200,
      "body": "​JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==",
      "uuid": "PDF-c76e-11ea-9bb8-afcd9ab06c4e"
    }
  ],
  requests: [
    {
      "uri": "/life/api/arkea/subscriptions/address/town",
      "method": "GET",
      "body": null,
      "uuid": "TOWN-c76e-11ea-9bb8-afcd9ab06c4e"
    },
    {
      "uri": "/life/api/arkea/pdf/documents/notice-assurance-vie",
      "method": "GET",
      "body": null,
      "uuid": "PDF-c76e-11ea-9bb8-afcd9ab06c4e"
    }
  ]
}).write(); // First launch only

export const mongoConnect = () => {
  mongoose.connect(
    `mongodb://${CONFIG.mongo.ip}:${CONFIG.mongo.port}/${CONFIG.mongo.base_name}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  mongoose.set("useFindAndModify", false);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connexion avec la base de donnée OK");
  });
};

export const ODM_MANAGER: ODM_MANAGERI = {
  LOWDB: {
    saveRequest: (request): Promise<any> => {
      const payload = {
        uri: request.body.uri,
        method: request.body.method,
        body: request.body.body,
        uuid: request.body.uuid,
      };
      return new Promise((resolve) => {
        resolve((DB.get("requests") as any).push(payload).write());
      });
    },
    saveResponse: (response): Promise<any> => {
      const payload = {
        statusCode: response.body.statusCode,
        body: response.body.body,
        uuid: response.body.uuid,
      };
      return new Promise((resolve) => {
        resolve((DB.get("responses") as any).push(payload).write());
      });
    },
    getUUID: (uuid: string): Promise<any> => {
      let responses = DB.get("responses").value();
      let requests = DB.get("requests").value();

      return new Promise((resolve) => {
        resolve({
          REQUEST: requests.find((req) => req.uuid === uuid),
          RESPONSE: responses.find((req) => req.uuid === uuid),
        });
      });
    },
    getAll: (): Promise<any> => {
      let responses = DB.get("responses").value();
      let requests = DB.get("requests").value();
      return new Promise((resolve) => {
        resolve(mergeAllItems(requests, responses));
      });
    },
    retrieveDatasFromUrlAndMethod: (req): any => {
      let requests = DB.get("requests")
        .value()
        .find((currentRequest) => req.params[0] === currentRequest.uri);
      if (requests !== null) {
        return new Promise((resolve) => {
          resolve(
            DB.get("responses")
              .value()
              .find((currentResponse) => currentResponse.uuid === requests.uuid)
          );
        });
      }
    },
  },
  MONGO: {
    saveRequest: (request): Promise<any> => {
      const payload = {
        uri: request.body.uri,
        method: request.body.method,
        body: request.body.body,
        uuid: request.body.uuid,
      };
      return new RequestM(payload).save();
    },
    saveResponse: (response): Promise<any> => {
      const payload = {
        statusCode: response.body.statusCode,
        body: response.body.body,
        uuid: response.body.uuid,
      };
      return new ResponseM(payload).save();
    },
    getUUID: (uuid: string): Promise<any> => {
      let request;
      let response;
      return RequestM.findOne({ uuid: uuid })
        .then((result) => {
          request = result;
          return ResponseM.findOne({ uuid: uuid });
        })
        .then((result) => {
          response = result;
          return {
            REQUEST: request,
            RESPONSE: response,
          };
        });
    },
    getAll: (): Promise<any> => {
      let requests;
      let responses;
      return RequestM.find()
        .then((arrayOfRequests) => {
          requests = arrayOfRequests;
          return ResponseM.find();
        })
        .then((arrayOfResponses) => {
          responses = arrayOfResponses;
          return mergeAllItems(requests, responses);
        });
    },
    retrieveDatasFromUrlAndMethod: (req): Promise<any> => {
      return RequestM.findOne({ uri: req.params[0] })
        .then((result: any) => {
          if (result !== null) return ResponseM.findOne({ uuid: result.uuid });
        })
        .then((response: any) => {
          return response;
        });
    },
  },
};

function mergeAllItems(reqs, resps) {
  return reqs.map((req) => {
    return {
      REQUEST: req,
      RESPONSE: resps.filter((resp) => resp.uuid == req.uuid),
    };
  });
}