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
  aws: {
    access_key_id: string
    secret_access_key: string
  }
  auth: {
    redirectUrl: string
    tokenUrl: string
    clientId: string
    clientSecret: string
  }
}
