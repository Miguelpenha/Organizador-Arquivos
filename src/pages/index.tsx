import { Container, Title, ButtonOrganize, SelectThemes } from '../styles/pages'
import Itheme from '../../electron/types/theme'
import { MenuItem } from '@material-ui/core' 

export default function Index(props: {themes: Array<Itheme>, themeUsed: string, mutateTheme: Function}) {
  return (
    <Container>
      <Title>Organizador de arquivos</Title>
      <ButtonOrganize variant='contained' onClick={() => window.electron.files.organize()}>Organizar</ButtonOrganize>
      <SelectThemes value={props.themeUsed} onChange={ev => props.mutateTheme(ev.target.value)}>
        {props.themes.map((theme, index) => <MenuItem value={theme.name} key={index}>{theme.name}</MenuItem>)}
      </SelectThemes>
    </Container>
  )
}