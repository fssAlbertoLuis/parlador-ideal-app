import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        default: string,
        alternative: string,
      },
      danger: {
        default: string,
        alternative: string,
      }
    }
  }
}
