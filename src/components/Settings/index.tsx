import Itheme from '../../../electron/types/theme'
import { useState } from 'react'
import { Tooltip } from '@material-ui/core'
import { ButtonSettings, IconSettings } from './style'
import ModelSettings from '../ModelSettings'

interface Iprops {
  themes: Array<Itheme>,
  themeUsed: string,
  mutateTheme: Function
}

export default function Settings(props: Iprops) {
  const [modelSettingsState, setModelSettingsState] = useState(false)
  const { mutateTheme, themeUsed, themes } = props

  const handleClickOpen = () => setModelSettingsState(true)

  const handleClose = () => setModelSettingsState(false)

  return (
    <>
      <Tooltip title="Abrir as configurações">
        <ButtonSettings onClick={handleClickOpen}>
          <IconSettings/>
        </ButtonSettings>
      </Tooltip>
      <ModelSettings open={modelSettingsState} onClose={handleClose} mutateTheme={mutateTheme} themeUsed={themeUsed} themes={themes}/>
    </>
  )
}