import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { app } from 'firebase-admin';
import { FIREBASE_ADMIN } from '@food-stories/api-gateway/core/firebase-admin';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(FIREBASE_ADMIN) private firebaseAdmin: app.App) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authToken = request.headers.authorization;
    console.log(authToken, 'authToken');
    if (!authToken) {
      return false;
    }

    try {
      const decodedToken = await this.firebaseAdmin
        .auth()
        .verifyIdToken(authToken);
      console.log(decodedToken);
      return true;
    } catch (error) {
      return false;
    }
  }
}
