import { WeakUser } from '../state/types';

const PLACEHOLDER_AVATAR = '/icons/placeholder-avatar.png';

export function getAvatarUrl(userOrUrl?: WeakUser | string): string {
  if (typeof userOrUrl === 'string') {
    return userOrUrl && userOrUrl.length > 0 ? userOrUrl : PLACEHOLDER_AVATAR;
  } else {
    return userOrUrl && userOrUrl.profileAvatar ? userOrUrl.profileAvatar : PLACEHOLDER_AVATAR;
  }
}
