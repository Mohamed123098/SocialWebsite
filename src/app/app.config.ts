import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './Core/Interceptors/header-interceptor';
import { errorInterceptor } from './Core/Interceptors/error-interceptor';
import{NgxSpinnerModule} from 'ngx-spinner'
import { loadingInterceptor } from './Core/Interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration:"top"}),withHashLocation(),withViewTransitions()),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor,loadingInterceptor])),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
