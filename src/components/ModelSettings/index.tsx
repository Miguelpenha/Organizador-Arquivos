import Itheme from '../../../electron/types/theme'
import { Dialog, Container, SelectThemes, SelectConfigs, ButtonSelectPathConfig, ButtonOpenConfigFolder } from './style'
import { MenuItem } from '@material-ui/core'
import { useState } from 'react'

interface Iprops {
  open: boolean,
  onClose: Function,
  themes: Array<Itheme>,
  themeUsed: string,
  mutateTheme: Function
}

export default function ModelSettings(props: Iprops) {
  const { open, onClose, mutateTheme, themeUsed, themes } = props
  const [configsFiles, setConfigsFiles] = window.electron.configsFiles.get()
  const [configSelect, setConfigSelect] = useState(configsFiles[0].path)
  
  const handleClose = () => onClose()
  
  return (
    <Dialog fullWidth={true} scroll="paper" maxWidth="md" onClose={handleClose} open={open}>
      <Container>
        <SelectConfigs value={configSelect} onChange={ev => setConfigSelect(String(ev.target.value))}>
          {configsFiles.map((config, index) => <MenuItem value={config.path} key={index} style={{color: '#ffffff'}}>{config.name}</MenuItem>)}
        </SelectConfigs>
        <div style={{color: '#fff'}}>
          <span>Caminho: </span>
          <ButtonSelectPathConfig onClick={() => window.electron.configsFiles.openDialog()}>{configSelect}</ButtonSelectPathConfig>
        </div>
        <SelectThemes value={themeUsed} onChange={ev => mutateTheme(ev.target.value)}>
          {themes.map((theme, index) => <MenuItem style={{backgroundColor: theme.backgroundColor, color: theme.color}} value={theme.name} key={index}>{theme.name}</MenuItem>)}
        </SelectThemes>
        <ButtonOpenConfigFolder onClick={window.electron.openConfigFolder}>Abrir pasta de configuração</ButtonOpenConfigFolder>
      </Container>
    </Dialog>
  )
}