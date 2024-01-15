const genderLookup = {
  M: 'Male',
  F: 'Female',
}

export const transformGender = (char: string) => genderLookup[char as 'M' | 'F']
