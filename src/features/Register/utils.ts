export const isValidEmail = (email: string) => String(email)
  .toLowerCase()
  .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

export const jsonDeepEqualityCheck = (
  obj1: Object, obj2: Object,
) => JSON.stringify(obj1) !== JSON.stringify(obj2)
