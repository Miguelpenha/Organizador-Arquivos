import Itheme from '../../../electron/types/theme'
import { FC, useState } from 'react'
import { Tooltip } from '@material-ui/core'
import { ButtonSettings, IconSettings } from './style'
import ModelSettings from '../ModelSettings'

interface Iprops {
  themes: Itheme[]
  themeUsed: string
  mutateTheme: Function
}

const Settings: FC<Iprops> = ({ mutateTheme, themeUsed, themes }) => {
  const [modelSettingsState, setModelSettingsState] = useState(false)
  const handleClickOpen = () => setModelSettingsState(true)
  const handleClose = () => setModelSettingsState(false)

  return (
    <>
      <Tooltip title="Abrir as configurações">
        <ButtonSettings onClick={handleClickOpen}>
          <IconSettings/>
        </ButtonSettings>
      </Tooltip>
      <ModelSettings
        themes={themes}
        onClose={handleClose}
        themeUsed={themeUsed}
        open={modelSettingsState}
        mutateTheme={mutateTheme}
      />
    </>
  )
}

export default Settings