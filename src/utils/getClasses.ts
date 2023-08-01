export const getClasses = (classes: Array<string>) =>
  classes
    .filter((item: string) => item !== '')
    .join(' ')
    .trim();
