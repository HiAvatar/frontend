import { usePostOptionsMutation } from 'api/optionApi'
import {
  VoicePreForwardIcon,
  VoicePrePlayIcon,
  VoicePreRewindIcon,
  VoicePauseIcon,
  VoiceStopIcon,
  TooltipIcon
} from 'components/Icons'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store'
import { textsCreatePreview } from 'store/slices/optionSlice'
import { TootipMessage } from 'components/common/TootipMessage'
import * as S from './style'

interface Time {
  audioDurationTime: number
}

const RenderTime = (time: Time) => {
  let seconds = Object.values(time)

  // let min = parseInt((seconds[0] % 3600) / 60)
  let min = Math.floor((seconds[0] % 3600) / 60)
  let sec = seconds[0] % 60
  return (
    <S.RenderTime>{`${min > 9 ? '' : '0'}${min}:${
      sec > 9 ? '' : '0'
    }${sec}`}</S.RenderTime>
  )
}

export const VoicePreviewPlayer = () => {
  const audioElem: React.RefObject<HTMLAudioElement> = useRef(null)
  const ProjectTextEditOption = useAppSelector((state) => state.option)
  const dispatch = useAppDispatch()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDownLoad, setIsDownLoad] = useState(false)
  const [audioDurationTime, setAudioDurationTime] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)
  const [textsPreviewUrl, setTextsPreviewUrl] = useState('')
  // const textsPreviewUrl = useRef()
  const [postOptions] = usePostOptionsMutation()
  const { projectId } = useParams()

  const changeFlag = useRef(false)

  useEffect(() => {
    const projectData = ProjectTextEditOption.textsPreviewData

    if (Object.keys(ProjectTextEditOption.textsPreviewData).length) {
      postOptions({ projectData, projectId })
        .unwrap()
        .then((data) => {
          setTextsPreviewUrl(data.data.totalAudioUrl)
        })
        .catch((error) => {
          alert(error)
        })
    }
    changeFlag.current = true
  }, [ProjectTextEditOption.textsPreviewData.texts])

  useEffect(() => {
    if (isPlaying) {
      textsPreviewUrl && audioElem.current!.play()
    } else {
      audioElem.current!.pause()
    }
    audioElem.current!.onended = () => {
      audioElem.current!.pause()
      audioElem.current!.currentTime = 0
      setIsPlaying(false)
    }
    isDownLoad &&
      fetch(textsPreviewUrl).then((response) => {
        response.blob().then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `VoicePreview.mp4` // 연습용 이름.mp4
          a.click()
        })
      })
    console.log(isDownLoad)
  }, [textsPreviewUrl, isDownLoad])

  useEffect(() => {
    if (!changeFlag.current) {
      if (isPlaying) {
        textsPreviewUrl && audioElem.current!.play()
      } else {
        audioElem.current!.pause()
      }
      audioElem.current!.onended = () => {
        audioElem.current!.pause()
        audioElem.current!.currentTime = 0
        setIsPlaying(false)
      }
    }
  }, [isPlaying])

  const playPause = () => {
    const {
      userSelectedList,
      textPreviewData,
      textsPreviewData,
      audioFile,
      dummyData,
      totalAudioUrl,
      ...textData
    } = ProjectTextEditOption
    dispatch(textsCreatePreview(textData))
    setIsPlaying(!isPlaying)
    changeFlag.current = false
  }

  const stop = () => {
    audioElem.current!.pause()
    audioElem.current!.currentTime = 0
    setIsPlaying(false)
  }

  const onPlaying = () => {
    const duration = String(audioElem.current?.duration)
    const currentTime = String(audioElem.current?.currentTime)
    if (duration !== 'NaN') {
      setAudioDurationTime(parseInt(duration))
    } else {
      setAudioDurationTime(0)
    }
    setAudioCurrentTime(parseInt(currentTime))
  }

  const userCurrentTimeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTime = Number(e.target.value)
    audioElem.current!.currentTime = currentTime
  }

  const test = async () => {
    const {
      userSelectedList,
      textPreviewData,
      textsPreviewData,
      audioFile,
      dummyData,
      totalAudioUrl,
      ...textData
    } = ProjectTextEditOption
    dispatch(textsCreatePreview(textData))
    setIsDownLoad(true)
    setTimeout(() => {
      setIsDownLoad(false)
    }, 50)
  }

  return (
    <>
      <S.TitleGroup>
        <div className='title'>
          <S.Tooltip>
            <TooltipIcon width='1.6rem' height='1.6rem' />
            <div className='message'>
              <TootipMessage
                content='전체 스크립트를 미리 듣고 다운로드 할 수 있어요.'
                width='max-content;'
              />
            </div>
          </S.Tooltip>
          <span className='title'>합친 음성을 미리 들을 수 있어요</span>
        </div>
        <button className='download' onClick={test}>
          전체 음성 다운로드
        </button>
      </S.TitleGroup>
      <audio src={textsPreviewUrl} ref={audioElem} onTimeUpdate={onPlaying} />
      <S.AudioPlayer>
        <S.Inner>
          <S.PlayPauseButton onClick={playPause}>
            {isPlaying ? (
              <VoicePauseIcon width='25' height='24' fillColor='#336CFF' />
            ) : (
              <VoicePrePlayIcon width='25' height='24' fillColor='#336CFF' />
            )}
          </S.PlayPauseButton>
          <S.PlayPauseButton onClick={stop}>
            <VoiceStopIcon width='25' height='24' fillColor='#336CFF' />
          </S.PlayPauseButton>

          <S.ProgressBarGroup>
            <RenderTime audioDurationTime={audioCurrentTime} />
            {/* {audioCurrentTime} */}
            <S.ProgressBar
              type='range'
              min={0}
              max={audioDurationTime}
              value={audioCurrentTime}
              onChange={userCurrentTimeHandeler}
            />
            <RenderTime audioDurationTime={audioDurationTime} />
          </S.ProgressBarGroup>
        </S.Inner>
      </S.AudioPlayer>
    </>
  )
}
