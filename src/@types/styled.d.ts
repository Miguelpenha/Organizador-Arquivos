import Itheme from '../../electron/types/theme'

declare module 'styled-components' {
    export interface DefaultTheme extends Itheme {
      
    }
}