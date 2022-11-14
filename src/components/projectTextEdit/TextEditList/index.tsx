import React, { useEffect, useRef, useState } from 'react'
import * as S from './style'
import { TextPlayer } from '../TextPlayer'
import { useAppDispatch, useAppSelector } from 'store'
import { renderText, outFocus } from 'store/slices/optionSlice'
import {
  ProjectTextEnterButton,
  ProjectVoiceUploadButton,
  TootipMessage,
  VoiceUploadButton,
  TextEnterButton,
  ProjectTextModal
} from 'components'
import { TooltipIcon } from 'components/Icons'
import { usePostTextMutation } from 'api/optionApi'

export const TextEditList = () => {
  const dispatch = useAppDispatch()
  const { texts, splitTextList, userSelectedList, textPreviewData } =
    useAppSelector((state) => state.option)
  const [modalText, setModalText] = useState('')
  const [modal, setModal] = useState(false)

  const [postText] = usePostTextMutation()
  const [audioFile, setAudioFile] = useState()
  const changeFlag: ChangeFlag = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioElem = useRef<HTMLAudioElement>(null)
  const onendedAudio = useRef(false)

  interface ChangeFlag {
    current: boolean
  }

  useEffect(() => {
    if (texts.length) {
      dispatch(renderText(textDatas))
    }
  }, [texts])

  const textDatas = texts.split('.').map((item, index) => {
    return {
      ...splitTextList[0],
      sentenceId: index + 1,
      text: item,
      sentenceSpacing: 0
    }
  })

  useEffect(() => {
    postText(textPreviewData)
      .unwrap()
      .then((data) => {
        setAudioFile(data.data.audioFile)
      })
      .catch((error) => {
        console.log(error)
        // alert(error)
      })
    changeFlag.current = true
  }, [textPreviewData.text])

  useEffect(() => {
    if (isPlaying) {
      audioElem.current!.play()
    } else {
      audioElem.current?.pause()
    }
    // audioElem.current.onended = () => {
    //   audioElem.current.pause()
    //   audioElem.current.currentTime = 0
    //   setIsPlaying(false)
    // }
  }, [audioFile])

  useEffect(() => {
    if (!changeFlag.current) {
      if (isPlaying) {
        audioElem.current!.play()
      } else {
        audioElem.current!.pause()
      }
    }
    // audioElem.current.onended = () => {
    //   audioElem.current.pause()
    //   audioElem.current.currentTime = 0
    //   setIsPlaying(false)
    // }
    onendedAudio.current = true
  }, [isPlaying])

  if (audioElem.current) {
    audioElem.current.onended = () => {
      audioElem.current!.pause()
      audioElem.current!.currentTime = 0
      setIsPlaying(false)
      onendedAudio.current = false
    }
  }

  const userOutFocusHandler = () => {
    dispatch(outFocus())
  }

  const renderList = splitTextList.map((item) => {
    let orginData = item

    console.log(splitTextList)
    console.log('부모', audioElem.current)

    const findData = userSelectedList.find((item) => {
      return orginData.sentenceId === item.sentenceId
    })
    return (
      <TextPlayer
        key={item.sentenceId}
        itemData={item}
        splitTextList={splitTextList}
        findData={findData}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioFile={audioFile}
        audioElem={audioElem}
        changeFlag={changeFlag}
        onendedAudio={onendedAudio}
      />
    )
  })

  return (
    <S.Wrapper onClick={userOutFocusHandler}>
      <S.TitleGroup>
        <S.Title>
          <S.Tooltip>
            <TooltipIcon width='1.6rem' height='1.6rem' />
            <div className='message'>
              <TootipMessage
                content='문장을 선택하면 문장별로 스크립트 수정이 가능하고 
                간격 조절과 문장을 추가, 삭제할 수 있어요.'
                width='27.0rem'
              />
            </div>
          </S.Tooltip>
          <span className='title'>문장별로 텍스트를 수정해주세요</span>
        </S.Title>
        {!!splitTextList.length && (
          <div className='button-group'>
            <ProjectTextEnterButton setModal={setModal} />
            <ProjectVoiceUploadButton />
          </div>
        )}
      </S.TitleGroup>

      {modal && (
        <ProjectTextModal
          setModal={setModal}
          modalText={modalText}
          setModalText={setModalText}
        />
      )}
      <>
        {!splitTextList.length ? (
          <S.StartPage>
            <VoiceUploadButton />
            <TextEnterButton setModal={setModal} />
          </S.StartPage>
        ) : (
          <>{renderList}</>
        )}
      </>
    </S.Wrapper>
  )
}
