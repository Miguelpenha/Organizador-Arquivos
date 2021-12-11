import Itheme from '../../electron/types/theme'
import { useState } from 'react'
import { Container, Title, ButtonOrganize, Alert } from '../styles/pages'
import { Snackbar } from '@material-ui/core'
import Settings from '../components/Settings'

interface Iprops {
  themes: Array<Itheme>,
  themeUsed: string,
  mutateTheme: Function
}

export default function Index(props: Iprops) {
  const { mutateTheme, themeUsed, themes } = props
  const [alertOrganize, setAlertOrganize] = useState(false)

  const handleClick = () => setAlertOrganize(true)

  const handleClose = () => setAlertOrganize(false)
  
  return (
    <Container>
      <Title>Organizador de arquivos</Title>
      <ButtonOrganize variant='contained' onClick={() => {
        window.electron.files.organize()
        handleClick()
      }}>Organizar arquivos</ButtonOrganize>
      <Snackbar open={alertOrganize} anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="outlined">Área de trabalho organizada com sucesso</Alert>
      </Snackbar>
      <Settings mutateTheme={mutateTheme} themeUsed={themeUsed} themes={themes}/>
    </Container>
  )
}