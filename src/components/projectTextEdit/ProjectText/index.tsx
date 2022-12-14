import React from 'react'
import { useAppSelector } from 'store'
import * as S from './style'
import { TootipMessage } from 'components/common/TootipMessage'
import { TooltipIcon } from 'components/Icons'

interface SplitTextList {
  sentenceId: number
  sentenceSpacing: number
  text: string
}

interface UserSelected {
  focus: boolean
  sentenceId: number
}

interface Props {
  splitTextList: SplitTextList[]
  userSelectedList: UserSelected[]
}

const RenderList = ({ splitTextList, userSelectedList }: Props) => {
  return (
    <>
      {splitTextList.map((item) => {
        let orginData = item
        const findData = userSelectedList.find((item) => {
          return orginData.sentenceId === item.sentenceId
        })
        return (
          <div key={item.sentenceId}>
            <S.TextBox findData={findData?.focus}>{item.text}</S.TextBox>
          </div>
        )
      })}
    </>
  )
}

export const ProjectText = () => {
  const { splitTextList, userSelectedList } = useAppSelector(
    (state) => state.option
  )

  return (
    <S.Wrapper>
      <S.Title>
        <S.Psition>
          <S.Tooltip>
            <TooltipIcon width='1.6rem' height='1.6rem' />
            <div className='message'>
              <TootipMessage
                content='입력하신 전체 텍스트를 확인할 수 있어요. 문장을 선택하면 좌측 영역에서 바로 수정할 수 있어요.'
                width='27.6rem'
              />
            </div>
          </S.Tooltip>
        </S.Psition>
        <span className='title'>전체 텍스트를 확인해주세요</span>
      </S.Title>
      <S.TextGroup>
        <RenderList
          splitTextList={splitTextList}
          userSelectedList={userSelectedList}
        />
      </S.TextGroup>
    </S.Wrapper>
  )
}
