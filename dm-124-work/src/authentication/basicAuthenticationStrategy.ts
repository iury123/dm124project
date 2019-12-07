import { UserProfile, securityId } from "@loopback/security";
import { AuthenticationStrategy } from "@loopback/authentication";
import { Request, HttpErrors } from "@loopback/rest";
import { v4 as uuid } from 'uuid';

export interface Credentials {
  username: string;
  password: string;
}

const adminCredentials: Credentials = {
  username: 'admin',
  password: 'admin123'
}

export class BasicAuthenticationStrategy implements AuthenticationStrategy {

  name: string = 'basic';

  async authenticate(request: Request): Promise<UserProfile | undefined> {

    const credentials = this.extractCredentials(request);

    if (credentials.username === adminCredentials.username &&
      credentials.password === adminCredentials.password) {
      return {
        [securityId]: uuid(),
        name: credentials.username
      }
    }
    throw new HttpErrors.Unauthorized('Credenciais incorretas');
  }

  extractCredentials(request: Request): Credentials {
    const auth: string = request.headers.authorization || '';
    const [authType, base64Credentials] = auth.split(' ');
    if (authType.toLowerCase() !== 'basic') {
      throw new HttpErrors.Unauthorized('Não possui basic authorization');
    }
    const stringCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = stringCredentials.split(':');
    return { username, password };
  }
}
