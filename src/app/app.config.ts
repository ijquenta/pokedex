import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Cliente HTTP
    providePrimeNG({
      theme : {
        preset: Lara,
        options: {
            darkModeSelector: '.my-app-dark',
            cssLayer: {
              name: 'primeng',
              order: 'tailwind-base, primeng, tailwind-utilities'
            }
        }
      }
    }),
    provideAnimations()

  ]
};
