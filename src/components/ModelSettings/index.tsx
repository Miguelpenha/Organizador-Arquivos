import Itheme from '../../../electron/types/theme'
import { Dialog, Container, SelectThemes } from './style'
import { MenuItem } from '@material-ui/core'

interface Iprops {
  open: boolean,
  onClose: Function,
  themes: Array<Itheme>,
  themeUsed: string,
  mutateTheme: Function
}

export default function ModelSettings(props: Iprops) {
  const { open, onClose, mutateTheme, themeUsed, themes } = props

  const handleClose = () => onClose()
  
  return (
    <Dialog fullWidth={true} scroll="paper" maxWidth="md" onClose={handleClose} open={open}>
      <Container>
        <SelectThemes value={themeUsed} onChange={ev => mutateTheme(ev.target.value)}>
          {themes.map((theme, index) => <MenuItem style={{backgroundColor: theme.backgroundColor, color: theme.color}} value={theme.name} key={index}>{theme.name}</MenuItem>)}
        </SelectThemes>
      </Container>
    </Dialog>
  )
}