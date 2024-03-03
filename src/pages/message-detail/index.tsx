/* eslint-disable @typescript-eslint/no-explicit-any */
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ChatContainer, MessageList, MessageInput, ConversationHeader, Avatar, TypingIndicator, Message } from '@chatscope/chat-ui-kit-react';
import { useEffect, useState, useRef } from 'react';
import { socket } from '../../helps/socket';
import { EmojiPickers, ShowEmoji } from '../../components/common/emoji-picker';
import { EmojiClickData } from 'emoji-picker-react';
import { getProfileToLS } from '../../helps';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetConversationsQuery } from '../../apis/conversation';
import { useGetMeQuery } from '../../apis';
import { DEFAULT_IMAGE_AVATAR } from '../../helps/image-user-default';
interface Message {
  sender_id: string,
  content: string
}

export const MessageDetail = () => {
  const { receiver_id } = useParams()
  const [focus, setFocus]= useState<string>('no_enter')
  const { data: getConversations, isLoading } = useGetConversationsQuery(receiver_id ? {
    receiver_id: receiver_id as string,
    limit: 10,
    page: 1
  } : skipToken)

  const { data: getMe } = useGetMeQuery(receiver_id ? {
    user_id: receiver_id
  } : skipToken)
  const refEmojiPicker = useRef<ShowEmoji>(null)
  const profile = getProfileToLS() as {
    user_id: string
  }

  const [listMessages, setListMessage] = useState<Message[]>([])

  const [message, setMessage] = useState<Message>({
    sender_id: '',
    content: ''
  })

  useEffect(() => {
    socket.on('send_message', (data) => {
      setListMessage(prev => ([...prev, {
        sender_id: data.from,
        content: data.content
      }]))
    })
    socket.on('listen_for_text_input_events',(data:string)=>{
     
      setFocus(data)
    })
    socket.on('no_text_input_events',data=>{
      setFocus(data)
    })
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, [])

  useEffect(() => {
    if (receiver_id) {
      setListMessage(getConversations?.data as { content: string, sender_id: string }[])
    }
  }, [getConversations, receiver_id])


  const handleChange = (textContent: string) => {
    socket.emit('message_private', {
      content: textContent,
      from: profile.user_id,
      to: receiver_id
    })

    setListMessage(prev => ([...prev, {
      sender_id: profile.user_id,
      content: message.content
    }]))
  }

  const handleIcons = () => {
    if (refEmojiPicker.current) {
      refEmojiPicker.current.toggleShowEmoji()
    }
  }

  const handleShowEmojiPicker = (emojiData: EmojiClickData) => {
    setMessage(prev => ({ ...prev, content: message.content + emojiData.emoji }))
  }
  const handleChangeValue = (textContent: string) => {
    socket.emit('enter_text', {
      to: receiver_id,
      from: profile.user_id
    })
    setMessage({ sender_id: '', content: textContent })
  }

  const handleFocus=()=>{
    socket.emit('no_enter_text',{
      to:receiver_id,
      from:profile.user_id
    })
  }
  return (
    <div className=' h-[100vh] max-w-[610px] relative  '>
      <EmojiPickers ref={refEmojiPicker} handleShowEmojiPicker={handleShowEmojiPicker} className=' bottom-[70px] fixed  z-[9999] ' />
      <ChatContainer
        style={{
          height: '100%',
          position: 'fixed',
          width: '610px'
        }}
      >
        <ConversationHeader className='w-full'>
          <Avatar
            name={getMe?.data[0].username}
            src={getMe?.data[0].avatar ? getMe?.data[0].avatar : DEFAULT_IMAGE_AVATAR}
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName={getMe?.data[0].username}
          />
          <ConversationHeader.Actions>
          </ConversationHeader.Actions>
        </ConversationHeader>

        <MessageList
          className='mt-[30px]'
          typingIndicator={focus==='enter' && <TypingIndicator  />}>
          {
            listMessages?.map((messages, index) => {
              return <Message
                key={index}
                model={{
                  direction: messages.sender_id === profile.user_id ? 'outgoing' : 'incoming',
                  message: messages.content,
                  position: 'single',
                  sentTime: '15 mins ago'
                }}
              >
                <Avatar
                  name="Emily"
                  src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                />
              </Message>
            })
          }
        </MessageList>
        <MessageInput placeholder="Nhập tin nhắn..." onSend={handleChange} onChange={handleChangeValue} value={message.content} onBlur={handleFocus} autoFocus onAttachClick={handleIcons} />
      </ChatContainer>
    </div>

  )
}
