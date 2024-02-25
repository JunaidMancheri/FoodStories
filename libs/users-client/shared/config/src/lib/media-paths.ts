export const REF_PATHS = {
  getOriginalDpPath: (filename: string) => 'dp/' + filename,
  getThumbDpPath: (filename: string) => 'dp/thumb_' + filename,
  NO_DP_PATH: '/assets/no-dp.jpg',
  getOriginalPostPath: (postId: string, userId: string, index: number) => `${userId}/posts/${postId}/${index}`,
  getThumbPostPath: (postId: string, userId: string) => `${userId}/posts/${postId}/thumb`
}