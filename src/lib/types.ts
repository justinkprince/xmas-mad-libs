export interface ExpectedWord {
  id: string
  type: string
  label: string
  example?: string
}

export interface MadLibTemplate {
  id: string
  name: string
  description: string
  expectedWords: ExpectedWord[]
  template: string
}

export interface MadLibsData {
  templates: MadLibTemplate[]
}
