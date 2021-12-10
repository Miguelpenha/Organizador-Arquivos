import { Container, Text, Main } from '../styles/pages'
import { useEffect, useState } from 'react'

export default function Index() {
  const initialFiles: Array<string> = []
  const [files, setFiles] = useState(initialFiles)
  
  useEffect(() => {
    window.electron.getFiles().then(files => setFiles(files))
  }, [])

  return (
    <Container>
      <Text>Organizador de arquivos</Text>
      <Main>
        
      </Main>
    </Container>
  )
}