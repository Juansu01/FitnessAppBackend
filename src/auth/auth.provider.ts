import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient, AuthenticationClient } from 'auth0';

@Injectable()
export class AuthProvider {
  readonly managementClient: ManagementClient;
  readonly authenticationClient: AuthenticationClient;

  constructor(private configService: ConfigService) {
    const domain = this.configService.getOrThrow<string>('AUTH0_DOMAIN_ID');
    const clientId = this.configService.getOrThrow<string>('AUTH0_CLIENT_ID');
    const clientSecret = this.configService.getOrThrow<string>(
      'AUTH0_CLIENT_SECRET',
    );

    this.managementClient = new ManagementClient({
      domain,
      clientId,
      clientSecret,
    });

    this.authenticationClient = new AuthenticationClient({
      domain,
      clientId,
      clientSecret,
    });
  }
}
