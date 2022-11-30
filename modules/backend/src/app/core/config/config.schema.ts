export type ConfigSchema = {
  app: {
    port: number
    dev_mode: boolean
  }
}

export type AppConfigSchema = Pick<ConfigSchema, 'app'>
