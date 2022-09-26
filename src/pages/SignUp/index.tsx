import React from 'react'
import * as S from './style'
import { SignUpIcon } from 'components/Icons'

export const SignUp = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.TopText>회원가입</S.TopText>
        <S.EmailWrapper>
          <S.MidText>이메일</S.MidText>
          <S.PositionWrap>
            <S.EmailInput
              type='text'
              placeholder='이메일 주소를 입력해 주세요.'
              required
            />
            <S.IdCheckBtn>중복 확인</S.IdCheckBtn>
          </S.PositionWrap>
          <S.TempSpan>(이메일 중복 멘트)</S.TempSpan>
        </S.EmailWrapper>
        <S.PwWrapper>
          <S.MidText>비밀번호</S.MidText>
          <S.PositionWrap>
            <S.PwInput
              type='paswword'
              placeholder='비밀번호를 입력해 주세요.'
              required
            />
            <S.PwCheckBtn>
              <SignUpIcon width='18' height='18' />
            </S.PwCheckBtn>
          </S.PositionWrap>
          <S.TempSpan>
            * 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합(8~50자)
          </S.TempSpan>
        </S.PwWrapper>
        <S.PwWrapper>
          <S.MidText>비밀번호 확인</S.MidText>
          <S.PositionWrap>
            <S.PwInput
              type='password'
              placeholder='비밀번호를 확인해 주세요.'
              required
            />
            <S.PwCheckBtn>
              <SignUpIcon width='18' height='18' />
            </S.PwCheckBtn>
          </S.PositionWrap>
          <S.TempSpan>(비밀번호 중복 확인 멘트)</S.TempSpan>
        </S.PwWrapper>
        <S.SignUpBtn>회원가입</S.SignUpBtn>
      </S.Wrapper>
    </S.Container>
  )
}
