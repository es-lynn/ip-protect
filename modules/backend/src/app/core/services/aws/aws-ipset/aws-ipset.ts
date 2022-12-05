import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { GetIPSetResponse, IPSet, LockToken } from 'aws-sdk/clients/wafv2'

import { arr } from '../../../../../commons/utils/ArrayUtil'
import { regex } from '../../../../../commons/utils/Regex'
import { Config } from './aws-ipset.types'

export class AwsIpSet {
  private readonly client: AWS.WAFV2
  constructor(private config: Config) {
    this.client = new AWS.WAFV2({
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey
      },
      region: this.config.region
    })
  }

  async getIpAddressesForIpset(): Promise<{
    IPSet: IPSet
    LockToken: LockToken
  }> {
    const { IPSet, LockToken } = await this.client
      .getIPSet({
        Name: this.config.name,
        Id: this.config.id,
        Scope: 'REGIONAL'
      })
      .promise()
    if (IPSet == null || LockToken == null) {
      throw Error()
    }
    return {
      IPSet,
      LockToken
    }
  }

  async addIpAddressesToIpset(ipAddress: string | string[]): Promise<void> {
    const ipAddresses = formatIpAddress(ipAddress)
    const { LockToken, IPSet } = await this.getIpAddressesForIpset()
    await this.client
      .updateIPSet({
        Addresses: [...IPSet.Addresses, ...ipAddresses],
        Id: this.config.id,
        LockToken: LockToken,
        Name: this.config.name,
        Scope: 'REGIONAL'
      })
      .promise()
  }

  async removeIpAddressesFromIpset(ipAddress: string | string[]) {
    const ipAddresses = formatIpAddress(ipAddress)
    const { LockToken, IPSet } = await this.getIpAddressesForIpset()
    const finalAddresses = arr.difference(IPSet.Addresses, ipAddresses)
    await this.client
      .updateIPSet({
        Addresses: finalAddresses,
        Id: this.config.id,
        LockToken: LockToken,
        Name: this.config.name,
        Scope: 'REGIONAL'
      })
      .promise()
  }
}

function formatIpAddress(ipAddress: string | string[]): string[] {
  const ipAddresses = arr.arrayify(ipAddress)
  return ipAddresses.map(ip => {
    if (regex.ipv4.test(ip)) {
      return `${ip}/32`
    } else if (regex.ipv6.test(ip)) {
      return `${ip}/128`
    }
    throw Error(`Must be a valid IPv4 or IPv6 address: ${ip}`)
  })
}
