import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {ClientIdService} from './client-id.service';

export const clientIdInterceptor: HttpInterceptorFn = (req, next) => {
  const clientIdService = inject(ClientIdService);
  const clientId = clientIdService.getClientId();

  // Customize header name to whatever your backend expects
  const requestWithClientId = req.clone({
    setHeaders: {
      'X-Client-Id': clientId,
    },
  });

  return next(requestWithClientId);
};
