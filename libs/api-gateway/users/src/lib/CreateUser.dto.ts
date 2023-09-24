export class CreateUserDTO {
  email!: string;
  username!: string;
  DPURL?: string
  emailVerified!: boolean;
}