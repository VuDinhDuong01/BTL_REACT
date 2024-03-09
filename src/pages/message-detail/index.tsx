/* eslint-disable @typescript-eslint/no-explicit-any */
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ChatContainer, MessageList, MessageInput, ConversationHeader, Avatar, TypingIndicator, Message } from '@chatscope/chat-ui-kit-react';
import { useEffect, useState, useRef, useContext } from 'react';
import {t} from 'i18next'

import { EmojiPickers, ShowEmoji } from '../../components/common/emoji-picker';
import { EmojiClickData } from 'emoji-picker-react';
import { getProfileToLS } from '../../helps';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetConversationsQuery } from '../../apis/conversation';
import { useGetMeQuery } from '../../apis';
import { DEFAULT_IMAGE_AVATAR } from '../../helps/image-user-default';
import { Skeleton } from '../../components/ui/skeleton';
import { ContextAPI } from '../../hooks';

interface Message {
  sender_id: string,
  content: string
}

export const MessageDetail = () => {
  const {socket }= useContext(ContextAPI)
  const { receiver_id } = useParams()
  const [focus, setFocus] = useState<string>('no_enter')
  const { data: getConversations, isLoading } = useGetConversationsQuery(receiver_id ? {
    receiver_id: receiver_id as string,
    limit: 100,
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
    socket?.on('send_message', (data) => {
      console.log(data)
      setListMessage(prev => ([...prev, {
        sender_id: data.from,
        content: data.content
      }]))
    })
    socket?.on('listen_for_text_input_events', (data: string) => {
      setFocus(data)
    })
    socket?.on('no_text_input_events', data => {
      setFocus(data)
    })
    socket?.on("disconnect", () => {
      console.log(socket?.id);
    });

  }, [socket])

  useEffect(() => {
    if (receiver_id) {
      setListMessage(getConversations?.data as { content: string, sender_id: string }[])
    }
  }, [getConversations, receiver_id])


  const handleSendMessage = (textContent: string) => {
    if (socket) {
      socket.emit('message_private', {
        content: textContent,
        from: profile.user_id,
        to: receiver_id
      })
    }

    setListMessage((prev: Message[]) => ([...prev, {
      sender_id: profile.user_id,
      content: message.content
    }]))
    setMessage({
      content: '',
      sender_id: ''
    })
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
    if (socket) {
      socket.emit('enter_text', {
        to: receiver_id,
        from: profile.user_id
      })
    }
    setMessage({ sender_id: '', content: textContent })
  }

  const handleFocus = () => {
    if (socket) {
      socket.emit('no_enter_text', {
        to: receiver_id,
        from: profile.user_id
      })
    }
  }

  return (
    <div className=' h-[100vh] max-w-[610px] relative  '>
      <EmojiPickers ref={refEmojiPicker} handleShowEmojiPicker={handleShowEmojiPicker} className=' bottom-[50px] fixed  z-50 ' />
      <ChatContainer
        style={{
          height: '100%',
          position: 'fixed',
          width: '610px'
        }}
      >
        <ConversationHeader className='w-full'>
          <Avatar
            name={getMe?.data[0].name}
            src={getMe?.data[0].avatar ? getMe?.data[0].avatar : DEFAULT_IMAGE_AVATAR}
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName={getMe?.data[0].name}
          />
          <ConversationHeader.Actions>
          </ConversationHeader.Actions>
        </ConversationHeader>

        <MessageList
          className='mt-[30px]'
          typingIndicator={focus === 'enter' && <TypingIndicator />}>
          {
            isLoading ? <div className='mt-[100px]'> <Skeleton /></div> :
              listMessages?.length > 0 ? listMessages?.map((messages, index) => {
                return <Message
                  key={index}
                  model={{
                    direction: messages.sender_id === profile.user_id ? 'outgoing' : 'incoming',
                    message: messages.content,
                    position: 'single',
                  }}
                  
                >
                  {
                    profile.user_id !== messages.sender_id &&
                    <Avatar src={getMe?.data[0].avatar ? getMe?.data[0].avatar : DEFAULT_IMAGE_AVATAR} />
                  }
                </Message>
              }) : <div className='w-full flex items-center justify-center font-[600] font-fontFamily text-[20px] mt-[100px]'>{t('home.youAreUseSocialApplication')}</div>
          }
        </MessageList>
        <MessageInput placeholder={t('home.comment')} onSend={handleSendMessage} onChange={handleChangeValue} value={message.content} onBlur={handleFocus} autoFocus onAttachClick={handleIcons} />
      </ChatContainer>
    </div>

  )
}
