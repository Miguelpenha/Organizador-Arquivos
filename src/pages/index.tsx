import { Container, Text } from '../styles/pages'
import { config } from '../store'

export default function Index() {
  window.electron.setTheme('omni')
  // config.get('theme')

  return (
    <Container>
      <Text>Organizador de arquivos</Text>
    </Container>
  )
}