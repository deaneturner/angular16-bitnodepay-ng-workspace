export const jsonHelp = {
  prettyPrint: (obj: any) => {
    return JSON.stringify(obj, null, 2);
  }
}

export const xtermHelp = {
  lineBreak: () => {
    return '\r---------------------------------------------------------------\n';
  }
}
