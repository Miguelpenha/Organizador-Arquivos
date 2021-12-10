import { Container, Title } from '../styles/pages'

export default function Index() {
  return (
    <Container>
      <Title onClick={async () => console.log(await window.electron.files.organize())}>Organizador de arquivos</Title>
    </Container>
  )
}