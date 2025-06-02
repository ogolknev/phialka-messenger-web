import { routes } from './router'
import type { GenerateRoutesMap } from 'vue-routes-to-types'

type RoutesMap = GenerateRoutesMap<typeof routes>

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RoutesMap
  }
}
