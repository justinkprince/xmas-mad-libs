export interface MadLibData {
  [key: string]: string
}

const STORAGE_PREFIX = "madlib_"

export const saveMadLib = (id: string, data: MadLibData): void => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

export const getMadLib = (id: string): MadLibData | null => {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${id}`)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return null
  }
}

export const deleteMadLib = (id: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${id}`)
  } catch (error) {
    console.error("Error deleting from localStorage:", error)
  }
}

export const hasMadLib = (id: string): boolean => {
  return getMadLib(id) !== null
}
