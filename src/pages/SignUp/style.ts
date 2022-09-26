import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  /* text-align: center; */
  background-color: ${({ theme }) => theme.palette.background};
`
export const Wrapper = styled.div`
  margin: 0 auto;
  /* text-align: center; */
`
export const TopText = styled.div`
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
`
export const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
export const MidText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`
export const PositionWrap = styled.div`
  position: relative;
`
export const EmailInput = styled.input`
  width: 38.4rem;
  height: 5.6rem;
  border-radius: 0.8rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  color: #757575;
  font-size: 1.5rem;
  text-indent: 1.6rem;
`
export const IdCheckBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.blue50};
  color: ${({ theme }) => theme.palette.white};
  width: 7.7rem;
  height: 3.2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;

  position: absolute;
  left: 29.3rem;
  top: 1.2rem;
`
export const PwWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
export const PasswordText = styled.div`
  font-size: 1.5rem;
`
export const PwInput = styled.input`
  width: 38.4rem;
  height: 5.6rem;
  border-radius: 0.8rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  color: #757575;
  font-size: 1.5rem;
  text-indent: 1.6rem;
`
export const PwCheckBtn = styled.button`
  position: absolute;
  top: 1.8rem;
  left: 34rem;
  cursor: default;
`
export const SignUpBtn = styled.button`
  width: 38.4rem;
  height: 6rem;
  border-radius: 1rem;
  background-color: #757575;
  font-size: 2rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.palette.white};
`
export const TempSpan = styled.span`
  font-weight: 600;
`
