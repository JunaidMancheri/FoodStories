export interface EditProfileData {
  id: string;
  name: string | null ;
  bio: string | null ;
  username: string;
  DPURL: string | null;
  gender: 'male' | 'female' | 'preferNotToSay' | 'notMentioned'; 
}
