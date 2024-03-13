
export const checkStatusNotification = (status: string) => {
  switch (status) {
    case 'like':
      return "đã yêu thích bài viết của bạn"
    case 'follow':
      return 'đã theo dõi bạn'
    case 'comment':
      return 'đã bình luận bài viết của bạn'
    case 'repliesComment':
      return 'đã trả lời bình luận của bạn'
    case 'bookmark':
      return 'đã bookmark bài viết của bạn'
    case 'message':
      return 'đã nhắn tin cho bạn'
    default:
      break;
  }
}