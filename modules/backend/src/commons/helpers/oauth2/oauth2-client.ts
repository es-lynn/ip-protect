import axios from 'axios'
import * as jose from 'jose'
import { JSONWebKeySet } from 'jose'
import { KeyLike } from 'jose/dist/types/types'

import { IdTokenClaims } from './oauth2-client.types'

export class OAuth2Client {
  private jwks: KeyLike
  constructor(
    private cfg: {
      tokenUrl: string
      certUrl: string
      clientId: string
      clientSecret: string
    }
  ) {}

  public async getJwks(): Promise<KeyLike> {
    if (!this.jwks == null) {
      return this.jwks
    }
    this.jwks = jose.createRemoteJWKSet(new URL(this.cfg.certUrl)) as any
    return this.jwks
  }

  public async validateIdToken(idToken: string): Promise<IdTokenClaims> {
    const { payload } = await jose.jwtVerify(idToken, await this.getJwks(), {})
    return payload as any as IdTokenClaims
  }

  public async fetchIdToken(
    code: string,
    redirectUrl: string
  ): Promise<{ idToken: string; idTokenClaims: IdTokenClaims }> {
    const res = await axios.post(
      this.cfg.tokenUrl,
      new URLSearchParams({
        redirect_uri: redirectUrl,
        code: code,
        grant_type: 'authorization_code',
        client_id: this.cfg.clientId,
        client_secret: this.cfg.clientSecret
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    return {
      idToken: res.data.id_token,
      idTokenClaims: await this.validateIdToken(res.data.id_token)
    }
  }
}
