export interface IUser {
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'reader';
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  favoriteStories?: string[];
  followedUsers?: string[];
  followingUsers?: string[];
  settings: {
    theme: 'light' | 'dark';
    language?: string;
  };
}
