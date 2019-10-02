angular.module('app', [
  'app.run',
  'app.filters',
  'app.services',
  'app.components',
  'app.routes',
  'app.config',
  'app.partials',

  'ngMaterial',
  'mgo-angular-wizard',
  'angular-svg-round-progressbar',
  'ngVis',
  'ngParallax',
  'rzModule',
  'daterangepicker',
  'ng-fx',
  'ng-currency',
  'ngFileUpload',
  'ds.clock',
  'mdPickers',
  'mapboxgl-directive',
  'ngBootstrapLightbox',
  'hmTouchEvents',
  'ngAnimate',
  'angular-joyride'
  
]).config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': '#006064',
    '100': '#e8f5e9',
    '200': '#e8f5f9',
    '300': '#e8f5ff',
    '400': 'ef5350',
    '500': 'f44336',
    '600': 'e8f5f9',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': '#006064',
    'A100': '#006064',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': '#e8f5e9',
    'contrastDefaultColor': 'dark',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': [ '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': ['50', '900']    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('amazingPaletteName',
      {
        'default': '50', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      } 
    )
    .accentPalette('amazingPaletteName', {'default': '900'})
    .backgroundPalette('grey', 
    {
      'default': '50' // use shade 200 for default, and keep all other shades the same
    }
    );
});

angular.module('app.run', [])
angular.module('app.routes', [])
angular.module('app.filters', [])
angular.module('app.services', [])
angular.module('app.config', [])
angular.module('app.components', [
  'ui.router', 'angular-loading-bar',
  'restangular', 'ngStorage', 'satellizer',
  'ui.bootstrap', 'chart.js', 'mm.acl', 'datatables',
  'datatables.bootstrap', 'checklist-model'
])
