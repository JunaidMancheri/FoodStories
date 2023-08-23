import { v4 as  uuidV4 } from 'uuid';

export interface UserProps {
  name: string;
  userName: string;
  email: string;
  DPURL?: string;
}


interface Profile {
  bio?: string;
  gender?: 'male' | 'female' ,
  links?: string[];
}

export class User {
  public id: string;
  public name: string;
  public userName: string;
  public email: string;
  public isPrivate: boolean;
  public createdAt: number;
  public DPURL: string;
  public profile: Profile

  constructor(props : UserProps) {
    this.id = uuidV4();
    this.name = props.name;
    this.userName = props.userName;
    this.email = props.email;
    
    this.isPrivate = false;
    this.createdAt = Date.now()
    this.DPURL = props.DPURL || '';
    this.profile = {};

  }

}