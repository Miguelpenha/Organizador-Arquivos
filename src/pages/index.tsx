import { Container, Text } from '../styles/pages'
import { Outlet } from 'react-router-dom'

export default function Index() {
  return (
    <Container>
      <Text>Organizador de arquivos</Text>
      <Outlet/>
    </Container>
  )
}