import { bootstrapApplication } from '@angular/platform-browser'; 
import { appConfig } from './app/app.config'; 
import { App } from './app/app';
import { registerLocaleData } from '@angular/common'; 
import localeEsCo from '@angular/common/locales/es-CO'; 
import { LOCALE_ID } from '@angular/core'; 
registerLocaleData(localeEsCo); 
bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ]
}).catch((err) => console.error(err));

