import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      spacing: {
        '144': '36rem',
      }
    }
  }
}
