/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'

import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
// Types
import type { App } from 'vue'


const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
