export interface ThemeColor {
  name: string
  label: string
  activeColor: string
  color: string
}

export const themes: ThemeColor[] = [
  {
    name: 'zinc',
    label: 'Zinc',
    activeColor: 'hsl(0 72% 51%)',
    color: 'hsl(0 72% 51%)',
  },
  {
    name: 'rose',
    label: 'Rose',
    activeColor: 'hsl(346 77% 49%)',
    color: 'hsl(346 77% 49%)',
  },
  {
    name: 'orange',
    label: 'Orange',
    activeColor: 'hsl(24 95% 53%)',
    color: 'hsl(24 95% 53%)',
  },
  {
    name: 'green',
    label: 'Green',
    activeColor: 'hsl(142 71% 45%)',
    color: 'hsl(142 71% 45%)',
  },
  {
    name: 'blue',
    label: 'Blue',
    activeColor: 'hsl(217 91% 60%)',
    color: 'hsl(217 91% 60%)',
  },
]
