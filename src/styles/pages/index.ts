import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Alert as AlerMUI } from '@material-ui/lab'


export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.h2`
  margin-top: 2%;
  color: ${props => props.theme.color};
`

export const ButtonOrganize = styled(Button)`
  && {
    width: 14%;
    padding: 1%;
    font-size: 1vw;
    margin-top: 1%;
    cursor: pointer;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.comment};
  }

  &&:hover {
    opacity: 0.8;
    background-color: ${props => props.theme.comment};
  }
`

export const Alert = styled(AlerMUI)`
  && {
    width: 100%;
    color: #4caf50;
    font-size: 1.2vw;
  }
`