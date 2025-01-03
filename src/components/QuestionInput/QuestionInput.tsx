import { useContext, useState } from 'react'
import { FontIcon, Stack, TextField } from '@fluentui/react'
import { SendRegular } from '@fluentui/react-icons'

import Send from '../../assets/Send.svg'

import styles from './QuestionInput.module.css'
import { ChatMessage } from '../../api'
import { AppStateContext } from '../../state/AppProvider'
import { resizeImage } from '../../utils/resizeImage'

interface Props {
  onSend: (question: ChatMessage['content'], id?: string) => void
  disabled: boolean
  placeholder?: string
  clearOnSend?: boolean
  conversationId?: string
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, conversationId }: Props) => {
  const [question, setQuestion] = useState<string>('')
  const [base64Image, setBase64Image] = useState<string | null>(null)

  const appStateContext = useContext(AppStateContext)
  const OYD_ENABLED = appStateContext?.state.frontendSettings?.oyd_enabled || false

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      await convertToBase64(file)
    }
  }

  const convertToBase64 = async (file: Blob) => {
    try {
      const resizedBase64 = await resizeImage(file, 800, 800)
      setBase64Image(resizedBase64)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const sendQuestion = () => {
    if (disabled || !question.trim()) {
      return
    }

    const questionTest: ChatMessage['content'] = base64Image
      ? [
          { type: 'text', text: question },
          { type: 'image_url', image_url: { url: base64Image } }
        ]
      : question.toString()

    if (conversationId && questionTest !== undefined) {
      onSend(questionTest, conversationId)
      setBase64Image(null)
    } else {
      onSend(questionTest)
      setBase64Image(null)
    }

    if (clearOnSend) {
      setQuestion('')
    }
  }

  const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
    if (ev.key === 'Enter' && !ev.shiftKey && !(ev.nativeEvent?.isComposing === true)) {
      ev.preventDefault()
      sendQuestion()
    }
  }

  const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setQuestion(newValue || '')
  }

  const sendQuestionDisabled = disabled || !question.trim()

  return (
    <div
      className="flex flex-row h-[120px] w-full bg-white rounded-lg relative"
      style={{
        boxShadow: '0 8px 16px rgba(0,0,0,0.14), 0 0 2px rgba(0,0,0,0.12)'
      }}>
      <textarea
        placeholder={placeholder}
        className="flex-1 resize-none border-none focus:outline-none leading-10 mt-[10px] mb-[10px] ml-3 mr-3 w-full"
        value={question}
        onChange={onQuestionChange}
        onKeyDown={onEnterPress}
      />

      {!OYD_ENABLED && (
        <div className="absolute right-6 top-5">
          <input
            type="file"
            id="fileInput"
            onChange={event => handleImageUpload(event)}
            accept="image/*"
            className={styles.fileInput}
          />
          <label
            htmlFor="fileInput"
            className="inline-block rounded-[5px] cursor-pointer text-center text-[14px]"
            aria-label="Upload Image">
            <FontIcon className={styles.fileIcon} iconName={'PhotoCollection'} aria-label="Upload Image" />
          </label>
        </div>
      )}
      {base64Image && <img className={styles.uploadedImage} src={base64Image} alt="Uploaded Preview" />}
      <div
        className={`absolute right-6 bottom-5`}
        role="button"
        tabIndex={0}
        aria-label="Ask question button"
        onClick={sendQuestion}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ' ? sendQuestion() : null)}>
        {sendQuestionDisabled ? (
          <SendRegular className={`w-6 h-[23px] bg-transparent text-[#424242]`} />
        ) : (
          <img src={Send} className={'w-6 h-[23px]'} alt="Send Button" />
        )}
      </div>
      <div
        className={'absolute w-full h-1 left-0 bottom-0'}
        style={{
          background: 'radial-gradient(106.04% 106.06% at 100.1% 90.19%, #0f6cbd 33.63%, #8dddd8 100%)',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px'
        }}
      />
    </div>
  )
}
