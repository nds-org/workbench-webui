/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Token } from '../models/token';
import { Auth } from '../models/auth';
import { Service } from '../models/service';
import { Account } from '../models/account';
import { Stack } from '../models/stack';
import { Log } from '../models/log';
import { Config } from '../models/config';
import { Vocabulary } from '../models/vocabulary';
import { SupportRequest } from '../models/support-request';
@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  static readonly postAuthenticatePath = '/authenticate';
  static readonly deleteAuthenticatePath = '/authenticate';
  static readonly getRefreshTokenPath = '/refresh_token';
  static readonly getCheckTokenPath = '/check_token';
  static readonly getServicesPath = '/services';
  static readonly postServicesPath = '/services';
  static readonly getServicesServiceIdPath = '/services/{service-id}';
  static readonly putServicesServiceIdPath = '/services/{service-id}';
  static readonly deleteServicesServiceIdPath = '/services/{service-id}';
  static readonly getAccountsPath = '/accounts';
  static readonly postAccountsPath = '/accounts';
  static readonly getAccountsAccountIdPath = '/accounts/{account-id}';
  static readonly putAccountsAccountIdPath = '/accounts/{account-id}';
  static readonly deleteAccountsAccountIdPath = '/accounts/{account-id}';
  static readonly getStacksPath = '/stacks';
  static readonly postStacksPath = '/stacks';
  static readonly getStacksStackIdPath = '/stacks/{stack-id}';
  static readonly putStacksStackIdPath = '/stacks/{stack-id}';
  static readonly deleteStacksStackIdPath = '/stacks/{stack-id}';
  static readonly putStacksStackIdRenamePath = '/stacks/{stack-id}/rename';
  static readonly getLogsStackServiceIdPath = '/logs/{stack-service-id}';
  static readonly getStartPath = '/start';
  static readonly getStartStackIdPath = '/start/{stack-id}';
  static readonly getStopStackIdPath = '/stop/{stack-id}';
  static readonly getConfigsPath = '/configs';
  static readonly getVersionPath = '/version';
  static readonly getValidatePath = '/validate';
  static readonly postRegisterPath = '/register';
  static readonly getVocabularyVocabNamePath = '/vocabulary/{vocab-name}';
  static readonly putChangePasswordPath = '/change_password';
  static readonly putRegisterVerifyPath = '/register/verify';
  static readonly postResetPath = '/reset';
  static readonly postSupportPath = '/support';
  static readonly getContactPath = '/contact';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Authenticate a user (login)
   * @param auth Auth definition
   * @return OK
   */
  postAuthenticateResponse(auth: Auth): __Observable<__StrictHttpResponse<{data?: Token}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = auth;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/authenticate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Token}>;
      })
    );
  }
  /**
   * Authenticate a user (login)
   * @param auth Auth definition
   * @return OK
   */
  postAuthenticate(auth: Auth): __Observable<{data?: Token}> {
    return this.postAuthenticateResponse(auth).pipe(
      __map(_r => _r.body as {data?: Token})
    );
  }

  /**
   * Logout a user
   * @return OK
   */
  deleteAuthenticateResponse(): __Observable<__StrictHttpResponse<{data?: Token}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/authenticate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Token}>;
      })
    );
  }
  /**
   * Logout a user
   * @return OK
   */
  deleteAuthenticate(): __Observable<{data?: Token}> {
    return this.deleteAuthenticateResponse().pipe(
      __map(_r => _r.body as {data?: Token})
    );
  }

  /**
   * Refresh the JWT token
   * @return OK
   */
  getRefreshTokenResponse(): __Observable<__StrictHttpResponse<{data?: Token}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/refresh_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Token}>;
      })
    );
  }
  /**
   * Refresh the JWT token
   * @return OK
   */
  getRefreshToken(): __Observable<{data?: Token}> {
    return this.getRefreshTokenResponse().pipe(
      __map(_r => _r.body as {data?: Token})
    );
  }

  /**
   * Validate the JWT token
   * @param host If specified, test authorization for JWT to access \ the given hostname
   */
  getCheckTokenResponse(host?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (host != null) __params = __params.set('host', host.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/check_token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Validate the JWT token
   * @param host If specified, test authorization for JWT to access \ the given hostname
   */
  getCheckToken(host?: string): __Observable<null> {
    return this.getCheckTokenResponse(host).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves a site-wide list of available service definitions.
   * @param catalog Filter list for catalog (user, system, all)
   * @return OK
   */
  getServicesResponse(catalog?: string): __Observable<__StrictHttpResponse<{data?: Array<Service>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (catalog != null) __params = __params.set('catalog', catalog.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/services`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Array<Service>}>;
      })
    );
  }
  /**
   * Retrieves a site-wide list of available service definitions.
   * @param catalog Filter list for catalog (user, system, all)
   * @return OK
   */
  getServices(catalog?: string): __Observable<{data?: Array<Service>}> {
    return this.getServicesResponse(catalog).pipe(
      __map(_r => _r.body as {data?: Array<Service>})
    );
  }

  /**
   * Adds a new service to the service library
   * @param service Service definition
   */
  postServicesResponse(service: Service): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = service;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/services`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Adds a new service to the service library
   * @param service Service definition
   */
  postServices(service: Service): __Observable<null> {
    return this.postServicesResponse(service).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves the service definition.
   * @param service-id The unique service identifier
   * @return The service object
   */
  getServicesServiceIdResponse(serviceId: string): __Observable<__StrictHttpResponse<{data?: Service}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/services/${serviceId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Service}>;
      })
    );
  }
  /**
   * Retrieves the service definition.
   * @param service-id The unique service identifier
   * @return The service object
   */
  getServicesServiceId(serviceId: string): __Observable<{data?: Service}> {
    return this.getServicesServiceIdResponse(serviceId).pipe(
      __map(_r => _r.body as {data?: Service})
    );
  }

  /**
   * Updates a service definition in the service library
   * @param params The `ApiService.PutServicesServiceIdParams` containing the following parameters:
   *
   * - `service-id`: The unique service identifier
   *
   * - `service`: Service definition
   */
  putServicesServiceIdResponse(params: ApiService.PutServicesServiceIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.service;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/services/${params.serviceId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Updates a service definition in the service library
   * @param params The `ApiService.PutServicesServiceIdParams` containing the following parameters:
   *
   * - `service-id`: The unique service identifier
   *
   * - `service`: Service definition
   */
  putServicesServiceId(params: ApiService.PutServicesServiceIdParams): __Observable<null> {
    return this.putServicesServiceIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete a service
   * @param service-id The unique service identifier
   */
  deleteServicesServiceIdResponse(serviceId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/services/${serviceId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Delete a service
   * @param service-id The unique service identifier
   */
  deleteServicesServiceId(serviceId: string): __Observable<null> {
    return this.deleteServicesServiceIdResponse(serviceId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves a site-wide list of NDSLabs accounts.
   * @return OK
   */
  getAccountsResponse(): __Observable<__StrictHttpResponse<{data?: Array<Account>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Array<Account>}>;
      })
    );
  }
  /**
   * Retrieves a site-wide list of NDSLabs accounts.
   * @return OK
   */
  getAccounts(): __Observable<{data?: Array<Account>}> {
    return this.getAccountsResponse().pipe(
      __map(_r => _r.body as {data?: Array<Account>})
    );
  }

  /**
   * Adds a new accounts
   * @param accounts Account definition
   */
  postAccountsResponse(accounts: Account): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = accounts;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/accounts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Adds a new accounts
   * @param accounts Account definition
   */
  postAccounts(accounts: Account): __Observable<null> {
    return this.postAccountsResponse(accounts).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves basic information about a account.
   * @param account-id The unique account identifier
   * @return OK
   */
  getAccountsAccountIdResponse(accountId: string): __Observable<__StrictHttpResponse<{data?: Account}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/accounts/${accountId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Account}>;
      })
    );
  }
  /**
   * Retrieves basic information about a account.
   * @param account-id The unique account identifier
   * @return OK
   */
  getAccountsAccountId(accountId: string): __Observable<{data?: Account}> {
    return this.getAccountsAccountIdResponse(accountId).pipe(
      __map(_r => _r.body as {data?: Account})
    );
  }

  /**
   * Updates account information
   * @param params The `ApiService.PutAccountsAccountIdParams` containing the following parameters:
   *
   * - `account-id`: The unique account identifier
   *
   * - `account`: Account definition
   */
  putAccountsAccountIdResponse(params: ApiService.PutAccountsAccountIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.account;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/accounts/${params.accountId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Updates account information
   * @param params The `ApiService.PutAccountsAccountIdParams` containing the following parameters:
   *
   * - `account-id`: The unique account identifier
   *
   * - `account`: Account definition
   */
  putAccountsAccountId(params: ApiService.PutAccountsAccountIdParams): __Observable<null> {
    return this.putAccountsAccountIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete a account
   * @param account-id The unique account identifier
   */
  deleteAccountsAccountIdResponse(accountId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/accounts/${accountId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Delete a account
   * @param account-id The unique account identifier
   */
  deleteAccountsAccountId(accountId: string): __Observable<null> {
    return this.deleteAccountsAccountIdResponse(accountId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves a list of stacks for this account.
   * @return OK
   */
  getStacksResponse(): __Observable<__StrictHttpResponse<{data?: Array<Stack>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stacks`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Array<Stack>}>;
      })
    );
  }
  /**
   * Retrieves a list of stacks for this account.
   * @return OK
   */
  getStacks(): __Observable<{data?: Array<Stack>}> {
    return this.getStacksResponse().pipe(
      __map(_r => _r.body as {data?: Array<Stack>})
    );
  }

  /**
   * Adds a new stack to this account
   * @param stack Stack definition
   */
  postStacksResponse(stack: Stack): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = stack;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/stacks`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Adds a new stack to this account
   * @param stack Stack definition
   */
  postStacks(stack: Stack): __Observable<null> {
    return this.postStacksResponse(stack).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves the stack definition.
   * @param stack-id The unique stack identifier
   * @return OK
   */
  getStacksStackIdResponse(stackId: string): __Observable<__StrictHttpResponse<{data?: Stack}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stacks/${stackId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Stack}>;
      })
    );
  }
  /**
   * Retrieves the stack definition.
   * @param stack-id The unique stack identifier
   * @return OK
   */
  getStacksStackId(stackId: string): __Observable<{data?: Stack}> {
    return this.getStacksStackIdResponse(stackId).pipe(
      __map(_r => _r.body as {data?: Stack})
    );
  }

  /**
   * Updates stack information
   * @param params The `ApiService.PutStacksStackIdParams` containing the following parameters:
   *
   * - `stack-id`: The unique stack identifier
   *
   * - `stack`: Stack definition
   */
  putStacksStackIdResponse(params: ApiService.PutStacksStackIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.stack;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/stacks/${params.stackId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Updates stack information
   * @param params The `ApiService.PutStacksStackIdParams` containing the following parameters:
   *
   * - `stack-id`: The unique stack identifier
   *
   * - `stack`: Stack definition
   */
  putStacksStackId(params: ApiService.PutStacksStackIdParams): __Observable<null> {
    return this.putStacksStackIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete a stack
   * @param stack-id The unique stack identifier
   */
  deleteStacksStackIdResponse(stackId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/stacks/${stackId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Delete a stack
   * @param stack-id The unique stack identifier
   */
  deleteStacksStackId(stackId: string): __Observable<null> {
    return this.deleteStacksStackIdResponse(stackId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Rename the stack
   * @param params The `ApiService.PutStacksStackIdRenameParams` containing the following parameters:
   *
   * - `stack-id`: The unique stack identifier
   *
   * - `name`: Stack name
   */
  putStacksStackIdRenameResponse(params: ApiService.PutStacksStackIdRenameParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.name;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/stacks/${params.stackId}/rename`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Rename the stack
   * @param params The `ApiService.PutStacksStackIdRenameParams` containing the following parameters:
   *
   * - `stack-id`: The unique stack identifier
   *
   * - `name`: Stack name
   */
  putStacksStackIdRename(params: ApiService.PutStacksStackIdRenameParams): __Observable<null> {
    return this.putStacksStackIdRenameResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves the stack service log.
   * @param stack-service-id The unique stack service identifier
   * @return OK
   */
  getLogsStackServiceIdResponse(stackServiceId: string): __Observable<__StrictHttpResponse<{data?: Log}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/logs/${stackServiceId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Log}>;
      })
    );
  }
  /**
   * Retrieves the stack service log.
   * @param stack-service-id The unique stack service identifier
   * @return OK
   */
  getLogsStackServiceId(stackServiceId: string): __Observable<{data?: Log}> {
    return this.getLogsStackServiceIdResponse(stackServiceId).pipe(
      __map(_r => _r.body as {data?: Log})
    );
  }

  /**
   * Adds, starts, and navigates to the specified application
   * @param key The key of the service spec to start and navigate to
   */
  getStartResponse(key: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (key != null) __params = __params.set('key', key.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/start`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Adds, starts, and navigates to the specified application
   * @param key The key of the service spec to start and navigate to
   */
  getStart(key: string): __Observable<null> {
    return this.getStartResponse(key).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Starts the specified stack
   * @param stack-id The unique stack identifier
   */
  getStartStackIdResponse(stackId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/start/${stackId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Starts the specified stack
   * @param stack-id The unique stack identifier
   */
  getStartStackId(stackId: string): __Observable<null> {
    return this.getStartStackIdResponse(stackId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Stops the specified stack
   * @param stack-id The unique stack identifier
   */
  getStopStackIdResponse(stackId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stop/${stackId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Stops the specified stack
   * @param stack-id The unique stack identifier
   */
  getStopStackId(stackId: string): __Observable<null> {
    return this.getStopStackIdResponse(stackId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves a list of service configuration options
   * @param services services to filter by
   * @return OK
   */
  getConfigsResponse(services?: Array<string>): __Observable<__StrictHttpResponse<{data?: Array<Config>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (services || []).forEach(val => {if (val != null) __params = __params.append('services', val.toString())});
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/configs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Array<Config>}>;
      })
    );
  }
  /**
   * Retrieves a list of service configuration options
   * @param services services to filter by
   * @return OK
   */
  getConfigs(services?: Array<string>): __Observable<{data?: Array<Config>}> {
    return this.getConfigsResponse(services).pipe(
      __map(_r => _r.body as {data?: Array<Config>})
    );
  }

  /**
   * Retrieve the server version
   * @return OK
   */
  getVersionResponse(): __Observable<__StrictHttpResponse<{data?: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/version`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: string}>;
      })
    );
  }
  /**
   * Retrieve the server version
   * @return OK
   */
  getVersion(): __Observable<{data?: string}> {
    return this.getVersionResponse().pipe(
      __map(_r => _r.body as {data?: string})
    );
  }

  /**
   * Check if the user has an active/valid OAuth session
   * @return OK
   */
  getValidateResponse(): __Observable<__StrictHttpResponse<{data?: Token}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/validate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Token}>;
      })
    );
  }
  /**
   * Check if the user has an active/valid OAuth session
   * @return OK
   */
  getValidate(): __Observable<{data?: Token}> {
    return this.getValidateResponse().pipe(
      __map(_r => _r.body as {data?: Token})
    );
  }

  /**
   * Register
   * @param account Account definition
   */
  postRegisterResponse(account: Account): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = account;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Register
   * @param account Account definition
   */
  postRegister(account: Account): __Observable<null> {
    return this.postRegisterResponse(account).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Retrieves a vocabulary
   * @param vocab-name Vocabulary name
   * @return OK
   */
  getVocabularyVocabNameResponse(vocabName: string): __Observable<__StrictHttpResponse<{data?: Array<Vocabulary>}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vocabulary/${vocabName}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{data?: Array<Vocabulary>}>;
      })
    );
  }
  /**
   * Retrieves a vocabulary
   * @param vocab-name Vocabulary name
   * @return OK
   */
  getVocabularyVocabName(vocabName: string): __Observable<{data?: Array<Vocabulary>}> {
    return this.getVocabularyVocabNameResponse(vocabName).pipe(
      __map(_r => _r.body as {data?: Array<Vocabulary>})
    );
  }

  /**
   * Change the user's password
   * @param password Change password object
   */
  putChangePasswordResponse(password: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = password;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/change_password`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Change the user's password
   * @param password Change password object
   */
  putChangePassword(password: string): __Observable<null> {
    return this.putChangePasswordResponse(password).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Verify registered email address
   * @param verify Verification object
   */
  putRegisterVerifyResponse(verify: {u?: string, t?: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = verify;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/register/verify`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Verify registered email address
   * @param verify Verification object
   */
  putRegisterVerify(verify: {u?: string, t?: string}): __Observable<null> {
    return this.putRegisterVerifyResponse(verify).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Request password reset email.
   * @param userId Username or email of the account to reset
   */
  postResetResponse(userId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (userId != null) __params = __params.set('userId', userId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/reset`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Request password reset email.
   * @param userId Username or email of the account to reset
   */
  postReset(userId: string): __Observable<null> {
    return this.postResetResponse(userId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Submit a support request
   * @param support Support request definition
   */
  postSupportResponse(support: SupportRequest): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = support;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/support`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Submit a support request
   * @param support Support request definition
   */
  postSupport(support: SupportRequest): __Observable<null> {
    return this.postSupportResponse(support).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get contact information
   */
  getContactResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/contact`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Get contact information
   */
  getContact(): __Observable<null> {
    return this.getContactResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ApiService {

  /**
   * Parameters for putServicesServiceId
   */
  export interface PutServicesServiceIdParams {

    /**
     * The unique service identifier
     */
    serviceId: string;

    /**
     * Service definition
     */
    service: Service;
  }

  /**
   * Parameters for putAccountsAccountId
   */
  export interface PutAccountsAccountIdParams {

    /**
     * The unique account identifier
     */
    accountId: string;

    /**
     * Account definition
     */
    account: Account;
  }

  /**
   * Parameters for putStacksStackId
   */
  export interface PutStacksStackIdParams {

    /**
     * The unique stack identifier
     */
    stackId: string;

    /**
     * Stack definition
     */
    stack: Stack;
  }

  /**
   * Parameters for putStacksStackIdRename
   */
  export interface PutStacksStackIdRenameParams {

    /**
     * The unique stack identifier
     */
    stackId: string;

    /**
     * Stack name
     */
    name: string;
  }
}

export { ApiService }
