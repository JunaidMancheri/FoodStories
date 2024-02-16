export interface EditProfileData {
  id: string;
  name: string ;
  bio: string | null ;
  username: string;
  DPURL: string ;
  gender: 'male' | 'female' | 'preferNotToSay' | 'notMentioned'; 
}
