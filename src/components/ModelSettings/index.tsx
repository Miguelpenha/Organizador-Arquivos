import Itheme from '../../../electron/types/theme'
import { FC, useState } from 'react'
import {
  Dialog,
  Container,
  SelectThemes,
  SelectConfigs,
  ButtonSelectPathConfig,
  ButtonOpenConfigFolder
} from './style'
import { MenuItem } from '@material-ui/core'

interface Iprops {
  open: boolean
  onClose: Function
  themes: Itheme[]
  themeUsed: string
  mutateTheme: Function
}

interface Iconfig {
  name: string
  path: string
  types: string[]
}

const ModelSettings: FC<Iprops> = ({ open, onClose, mutateTheme, themeUsed, themes }) => {
  const [configsFiles, setConfigsFiles] = useState(window.electron.configsFiles.get())
  const [configSelect, setConfigSelect] = useState(configsFiles[0].name)
  const handleClose = () => onClose()

  interface IPropsConfig {
    nameConfig: string
    configs: Iconfig[]
  }

  const SelectPath: FC<IPropsConfig> = ({ configs, nameConfig }) => {
    return (
      <>
        {configs.map((config, index) => {
          if (config.name === nameConfig) {
            return (
              <div style={{color: '#fff'}} key={index}>
                <ButtonSelectPathConfig
                  title="Editar configuração"
                  onClick={async () => {
                    let path: string | undefined = await window.electron.configsFiles.openDialog()
                    
                    if (path) {
                      window.electron.configsFiles.set(config.name, path)
                      setConfigsFiles(window.electron.configsFiles.get())
                    }
                  }}
                >
                  {config.path}
                </ButtonSelectPathConfig>
              </div>
            )
          }
        })}
      </>
    )
  }
  
  return (
    <Dialog
      open={open}
      maxWidth="md"
      scroll="paper"
      fullWidth={true}
      onClose={handleClose}
    >
      <Container>
        <SelectConfigs
          title="Editar configurações"
          value={configSelect}
          onChange={ev => (
            setConfigSelect(String(ev.target.value))
          )}
        >
          {configsFiles.map((config, index) => (
            <MenuItem
              key={index}
              value={config.name}
              style={{color: '#ffffff'}}
            >
              {config.name} ({config.path})
            </MenuItem>
          ))}
        </SelectConfigs>
        <SelectPath configs={configsFiles} nameConfig={configSelect}/>
        <SelectThemes title="Selecionar tema" value={themeUsed} onChange={ev => mutateTheme(ev.target.value)}>
          {themes.map((theme, index) => (
            <MenuItem
              key={index}
              value={theme.name}
              style={{backgroundColor: theme.backgroundColor, color: theme.color}}
            >
              {theme.name}
            </MenuItem>
          ))}
        </SelectThemes>
        <ButtonOpenConfigFolder
          title="Abrir pasta de configuração"
          onClick={window.electron.openConfigFolder}
        >
          Abrir pasta de configuração
        </ButtonOpenConfigFolder>
      </Container>
    </Dialog>
  )
}

export default ModelSettings