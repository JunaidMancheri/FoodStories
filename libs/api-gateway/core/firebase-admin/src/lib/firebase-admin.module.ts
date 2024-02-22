import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN } from './token';


@Module({
  controllers: [],
  providers: [
    {
      provide: FIREBASE_ADMIN,
      useFactory: () => {
        admin.initializeApp({
          credential: admin.credential.cert('./service-accounts/firebaseServiceAccount.json')
        })
        return admin
      }
    }
  ],
  exports: [FIREBASE_ADMIN],
})
export class FirebaseAdminModule {}
