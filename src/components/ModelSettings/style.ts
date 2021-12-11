import styled from 'styled-components'
import { Dialog as DialogMUI, Select, Button } from '@material-ui/core'

export const Dialog = styled(DialogMUI)`
  && {
    z-index: 1;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-bottom: 20%;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.comment};
`

export const SelectThemes = styled(Select)`
  && {
    width: 20%;
    margin-top: 5%;
    font-size: 2vw;
    padding-left: 2%;
    border-radius: 8px;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.backgroundColor};
  }

  & .MuiSelect-icon {
    color: ${props => props.theme.color};
  }
`

export const ButtonOpenConfigFolder = styled(Button)`
  && {
    width: 29%;
    padding: 2%;
    margin-top: 5%;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.backgroundColor};
  }

  &&:hover {
    opacity: 0.8;
    background-color: ${props => props.theme.backgroundColor};
  }
`