export type ConfigSchema = {
  app: {
    port: number
    dev_mode: boolean
    enable_swagger: boolean
  }
  swagger: {
    path: string
    title: string
    version: string
  }
}
