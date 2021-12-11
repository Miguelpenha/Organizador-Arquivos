import styled from 'styled-components'
import { Dialog as DialogMUI, Select } from '@material-ui/core'

export const Dialog = styled(DialogMUI)`
  && {
    z-index: 1;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.comment};
  display: flex;
  justify-content: center;
  padding-bottom: 20%;
`

export const SelectThemes = styled(Select)`
  && {
    width: 20%;
    margin-top: 5%;
    font-size: 2vw;
    padding-left: 1%;
    border-radius: 8px;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.backgroundColor};
  }

  & .MuiSelect-icon {
    color: ${props => props.theme.color};
  }
`