import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { Settings } from '@material-ui/icons'

export const ButtonSettings = styled(IconButton)`
  && {
    margin: 1%;
    padding: 0;
    position: absolute;
    align-self: flex-start;
  }
`

export const IconSettings = styled(Settings)`
  && {
    font-size: 3vw;
    color: ${props => props.theme.color};
  }
`