import React, { useCallback, useState } from 'react'
import * as S from './style'
import { PwErrorIcon, PwCheckIcon } from 'components/Icons'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Formik, Form, useFormik } from 'formik'
import * as Yup from 'yup'

interface SignUp {
  email: string
  password: string
  passwordCheck: string
}

export const SignUp = () => {
  const [userInput, setUserInput] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm()

  const formik = useFormik({
    //initialValues, onSubmit, yup유효성검사
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          '올바른 이메일 형식을 입력해주세요'
        )
        .required('입력한 이메일이 없습니다.'),
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/,
          '소문자 대문자 숫자 특수문자 최소8자'
        )
        .required('입력한 비밀번호가 없습니다'),
      confirmPassword: Yup.string()
        //비밀번호 일치여부체크
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('입력한 비밀번호가 없습니다.')
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      console.log(values)
    }
  })

  return (
    <S.Container>
      <S.Wrapper>
        <S.TopText>회원가입</S.TopText>
        <form onSubmit={formik.handleSubmit}>
          <S.EmailWrapper>
            <S.MidText htmlFor='email'>이메일</S.MidText>
            <S.EmailInput
              id='email'
              type='text'
              placeholder='이메일 주소를 입력해 주세요.'
              {...formik.getFieldProps('email')}
            />
            {/* 이메일 에러메세지 */}
            {formik.touched.email && formik.errors.email ? (
              <S.ErrorSpan>{formik.errors.email}</S.ErrorSpan>
            ) : null}
            <S.IdCheckBtn>중복 확인</S.IdCheckBtn>
          </S.EmailWrapper>
          <S.PwWrapper>
            <S.MidText htmlFor='password'>비밀번호</S.MidText>
            <S.PwInput
              id='password'
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              {...formik.getFieldProps('password')}
            />
            {/* 비밀번호 에러메세지 */}
            {formik.touched.password && formik.errors.password ? (
              <S.ErrorSpan>
                {formik.errors.password} <PwErrorIcon width='18' height='18' />
              </S.ErrorSpan>
            ) : // <PwCheckIcon width='18' height='18' />
            null}
          </S.PwWrapper>
          <S.PwWrapper>
            <S.MidText htmlFor='confirmPassword'>비밀번호 확인</S.MidText>
            <S.PwInput
              id='confirmPassword'
              type='password'
              placeholder='비밀번호를 확인해 주세요.'
              {...formik.getFieldProps('confirmPassword')}
            />
            {/* 비밀번호확인 에러메세지 */}
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <S.ErrorSpan>
                {formik.errors.confirmPassword}
                <PwErrorIcon width='18' height='18' />
              </S.ErrorSpan>
            ) : // <PwCheckIcon width='18' height='18' />
            null}
          </S.PwWrapper>
          <S.SignUpBtn type='submit'>회원가입</S.SignUpBtn>
        </form>
      </S.Wrapper>
    </S.Container>
  )
}
