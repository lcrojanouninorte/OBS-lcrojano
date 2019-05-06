import { RoutesRun } from './run/routes.run'
import { MapboxglRun } from './run/mapboxgl.run'

angular.module('app.run')
  .run(RoutesRun)
  .run(MapboxglRun)
