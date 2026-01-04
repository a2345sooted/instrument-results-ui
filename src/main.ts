import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { appConfig } from './app/app.config';
import { App } from './app/app';
import {clientIdInterceptor} from './app/core/client-id/client-id.interceptor';
import {API_BASE_URL} from './app/core/api/api-base-url.token';
import {environment} from './environments/environment';


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),

    // API base URL for all backend calls
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },

    provideHttpClient(withInterceptors([clientIdInterceptor])),
  ],
}).catch((err) => console.error(err));
