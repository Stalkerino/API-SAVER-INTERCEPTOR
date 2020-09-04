// For Angular 2 to 4.2
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import { Http } from '@angular/http';
import { v1 as uuidv1 } from 'uuid';
import { AppModule } from '.';
import { Injector, Injectable } from '@angular/core';
const axios = require('axios').default;

const URL = "https://master.api-saver.dev.shift.fip.ftntech.fr";
const interceptMode = false;

const ArrayOfPDF = ['notice-assurance-vie', 'kid-contrat-assurance-vie', 'conditions-tarifaires', 'politique-de-confidentialite'];

@Injectable()
export class ServerURLInterceptor implements Interceptor {

  private requestToMirror;
  private responseToMirror;
  private arrayUUid = [];
  private request;

  public interceptBefore(request: InterceptedRequest): InterceptedRequest {      
    // Do whatever with request: get info or edit it
    if (!request.url.includes(URL) && interceptMode) {

      if (request.url.includes('town')) {
        console.log('TOWN BYPASS');
        return;
      }

      if (ArrayOfPDF.find(pdfTitle => request.url.includes(pdfTitle))) {
        console.log('PDF BYPASS');
        return;
      }

      this.request = request;
      console.log(request.options);
      this.arrayUUid.push({ uuid: uuidv1(), url: request.url });
      this.requestToMirror = {
        uri: request.url,
        method: 'GET',
        body: null,
        uuid: this.arrayUUid.find(element => element.url === request.url).uuid
      };
      axios.post(URL + '/request', this.requestToMirror);
      console.log('request', this.requestToMirror);
    }

    if (!interceptMode) {
      request.url = request.url.replace('/life/api/', URL + '/life/api/');
      request.options.url = request.options.url.replace('/life/api/', URL + '/life/api/');
      console.log(request);
    }
    return request;
    /*
      You can return:
        - Request: The modified request
        - Nothing: For convenience: It's just like returning the request
        - <any>(Observable.throw("cancelled")): Cancels the request, interrupting it from the pipeline, and calling back 'interceptAfter' in backwards order of those interceptors that got called up to this point.
    */
  }

  private isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    // Do whatever with response: get info or edit it
    if (this.request && this.request.url.includes('town')) {
      console.log('TOWN BYPASS');
      return;
    }

    if (this.request && ArrayOfPDF.find(pdfTitle => this.request.url.includes(pdfTitle))) {
      console.log('PDF BYPASS');
      return;
    }

    if (this.request !== undefined && !this.request.url.includes(URL) && interceptMode) {

      let body;

      if (response.response['_body'] === undefined) {
        body = "";
      } else if (response.response.status == 500) {
        body = "Internal Server Error";
      } else {
        console.log(response.response['_body'])
        this.isJson(response.response['_body']) ? body = JSON.parse(response.response['_body']) : body = response.response['_body'];
      }
      const responseUrl = response.response.url.replace("http://127.0.0.1:4200", "");
      this.responseToMirror = {
        uuid: this.arrayUUid.find((element) => { return element.url === responseUrl }).uuid,
        statusCode: response.response.status,
        body: body
      };

      axios.post(URL + '/response', this.responseToMirror);
      this.arrayUUid.splice(this.arrayUUid.findIndex(element => element.url === responseUrl), 1);
    }

    return response;
    /*
      You can return:
        - Response: The modified response
        - Nothing: For convenience: It's just like returning the response
    */
  }
}