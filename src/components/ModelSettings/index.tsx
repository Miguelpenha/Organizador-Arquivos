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

interface Iconfig {
  name: string,
  path: string,
  types: Array<string>
}

export default function ModelSettings(props: Iprops) {
  const { open, onClose, mutateTheme, themeUsed, themes } = props
  const [configsFiles, setConfigsFiles] = useState(window.electron.configsFiles.get())
  const [configSelect, setConfigSelect] = useState(configsFiles[0].name)
  
  const handleClose = () => onClose()

  interface IPropsConfig {
    nameConfig: string,
    configs: Array<Iconfig>
  }

  function SelectPath(props: IPropsConfig) {
    const { configs, nameConfig } = props

    return (
      <>
        {configs.map((config, index) => {
          if (config.name === nameConfig) {
            return (
              <div style={{color: '#fff'}} key={index}>
                <ButtonSelectPathConfig onClick={async () => {
                  let path: string | undefined = await window.electron.configsFiles.openDialog()
                  
                  if (path) {
                    window.electron.configsFiles.set(config.name, path)
                    setConfigsFiles(window.electron.configsFiles.get())
                  }
                }}>{config.path}</ButtonSelectPathConfig>
              </div>
            )
          }
        })}
      </>
    )
  }
  
  return (
    <Dialog fullWidth={true} scroll="paper" maxWidth="md" onClose={handleClose} open={open}>
      <Container>
        <SelectConfigs value={configSelect} onChange={ev => setConfigSelect(String(ev.target.value))}>
          {configsFiles.map((config, index) => <MenuItem value={config.name} key={index} style={{color: '#ffffff'}}>{config.name} ({config.path})</MenuItem>)}
        </SelectConfigs>
        <SelectPath configs={configsFiles} nameConfig={configSelect}/>
        <SelectThemes value={themeUsed} onChange={ev => mutateTheme(ev.target.value)}>
          {themes.map((theme, index) => <MenuItem style={{backgroundColor: theme.backgroundColor, color: theme.color}} value={theme.name} key={index}>{theme.name}</MenuItem>)}
        </SelectThemes>
        <ButtonOpenConfigFolder onClick={window.electron.openConfigFolder}>Abrir pasta de configuração</ButtonOpenConfigFolder>
      </Container>
    </Dialog>
  )
}