import { Container, Title } from '../styles/pages'

export default function Index() {
  return (
    <Container>
      <Title onClick={async () => window.electron.files.organize()}>Organizador de arquivos</Title>
    </Container>
  )
}