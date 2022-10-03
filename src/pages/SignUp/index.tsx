import React, { useCallback, useState, FC } from 'react'
import * as S from './style'
import { PwErrorIcon, PwCheckIcon } from 'components/Icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Formik, Form, useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'

interface SignUpForm {
  email: string
  password: string
  passwordCheck: string
}

export const SignUp: FC = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    name: ''
  })
  const navigate = useNavigate()
  //이메일 중복검사
  const [Email, setEmail] = useState<string>('')
  const [EmailCheck, setEmailCheck] = useState<boolean>(false)
  //이메일 중복검사 에러메세지
  const [EmailMsg, setEmailMsg] = useState<string>('')
  //중복확인 안할시 버튼 비활성화
  const [disabledBtn] = useState(false)

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
          '소문자,대문자,숫자,특수문자를 포함하여 최소8자로 입력해주세요.'
        )
        .required('입력한 비밀번호가 없습니다'),
      confirmPassword: Yup.string()
        //비밀번호 일치여부체크
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('입력한 비밀번호가 없습니다.')
    }),
    onSubmit: async (values) => {
      console.log(values)
      axios.post('/signup').then((response: any) => {
        if (response.status == 200) {
          alert('회원가입완료')
          navigate('/sign-in')
        } else if (response.staus == 401) {
          alert('회원가입실패')
        }
      })
    }
  })

  const EmailCheckHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('이메일 중복검사')
    axios.post('/signup/check/duplicate-id').then((response: any) => {
      if (response.data.isIdAvailable) {
        setEmailCheck(true)
        setEmailMsg('')
      } else {
        setEmailMsg('중복된 이메일 주소가 있습니다.')
      }
    })
  }

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
              //이메일 중복검사 후 인풋 변경을 불가능하도록 disabled추가
              disabled={EmailCheck}
              {...formik.getFieldProps('email')}
            />
            {/* 이메일 중복, 에러메세지 */}
            {EmailMsg}
            {formik.touched.email && formik.errors.email ? (
              <S.ErrorSpan>{formik.errors.email}</S.ErrorSpan>
            ) : null}
            <S.IdCheckBtn onClick={(e) => EmailCheckHandler(e)}>
              중복 확인
            </S.IdCheckBtn>
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
          <S.SignUpBtn disabled={disabledBtn} type='submit'>
            회원가입
          </S.SignUpBtn>
        </form>
      </S.Wrapper>
    </S.Container>
  )
}
