export function getInitials(name: string): string {
  const splitName = name.split(' ');
  const initials = `${
    splitName.length >= 2
      ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}`
      : splitName[0].charAt(0)
  }`;

  return initials.toUpperCase();
}

export function getRandomString(length = 6): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
