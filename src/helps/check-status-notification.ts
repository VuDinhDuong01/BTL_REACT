
export const checkStatusNotification = (status: string) => {
  switch (status) {
    case 'like':
      return "đã yêu thích bài viết của bạn."
    case 'follow':
      return 'đã theo dõi bạn.'
    case 'comment':
      return 'đã bình luận bài viết của bạn.'
    case 'bookmark':
      return 'đã bookmark bài viết của bạn.'
    case 'message':
      return 'đã gửi tin nhắn cho bạn.'
    case 'reply_comment':
      return 'đã phản hồi bình luận của bạn.'
    case 'mentions':
      return 'đã nhắc tên bạn trong một bài đăng.'
      case 'share_post':
        return 'đã chia sẻ bài đăng của bạn.'
    default:
      break;
  }
}