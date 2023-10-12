export const jsonPrettyPrint = (json: any) => {
  return JSON.stringify(json, null, 2)
    .replace(' ', '&nbsp;')
    .replace('\n', '<br/>');
}
