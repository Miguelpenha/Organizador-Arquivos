import styled from 'styled-components'
import { Button, Select } from '@material-ui/core'

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
    background-color: #ffffff;
    color: #000000;
    width: 10%;
    font-size: 1vw;
    cursor: pointer;
    margin-top: 1%;
  }
`

export const SelectThemes = styled(Select)`
  && {
    background-color: ${props => props.theme.comment};
    margin-top: 2%;
    border-radius: 8px;
    font-size: 2vw;
    color: ${props => props.theme.color};
    padding-left: 1%;
    width: 20%;
  }
`