import Itheme from '../../electron/types/theme'
import { FC, useState } from 'react'
import { Container, Title, ButtonOrganize, Alert } from '../styles/pages'
import { Snackbar } from '@material-ui/core'
import Settings from '../components/Settings'

interface Iprops {
  themes: Itheme[]
  themeUsed: string
  mutateTheme: Function
}

const Index: FC<Iprops> = ({ mutateTheme, themeUsed, themes }) => {
  const [alertOrganize, setAlertOrganize] = useState(false)
  const handleClick = () => {
    window.electron.files.organize()
    setAlertOrganize(true)
  }
  const handleClose = () => setAlertOrganize(false)
  
  return (
    <Container>
      <Title>Organizador De Arquivos</Title>
      <ButtonOrganize
        variant='contained'
        title="Organizar arquivos"
        onClick={() => handleClick()}
      >
        Organizar arquivos
      </ButtonOrganize>
      <Snackbar
        open={alertOrganize}
        onClose={handleClose}
        autoHideDuration={3000}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
      >
        <Alert
          variant="outlined"
          severity="success"
          onClose={handleClose}
        >
          Área de trabalho organizada com sucesso
        </Alert>
      </Snackbar>
      <Settings
        themes={themes}
        themeUsed={themeUsed}
        mutateTheme={mutateTheme}
      />
    </Container>
  )
}

export default Index