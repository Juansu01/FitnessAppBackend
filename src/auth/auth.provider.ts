import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient, AuthenticationClient } from 'auth0';

@Injectable()
export class AuthProvider {
  readonly managementClient: ManagementClient;
  readonly authenticationClient: AuthenticationClient;

  constructor(private configService: ConfigService) {
    const domain = this.configService.getOrThrow<string>('AUTH0_DOMAIN_ID');
    const clientId = this.configService.getOrThrow<string>(
      'AUTH0_CLIENT_SECRET',
    );

    if (!domain || !clientId) {
      throw new Error('Auth0 domain or clientId not defined');
    }

    this.authenticationClient = new AuthenticationClient({
      domain,
      clientId,
    });
  }
}
