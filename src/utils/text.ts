export function getInitials(name: string): string {
  const splitName = name.split(' ');
  const initials = `${
    splitName.length >= 2
      ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}`
      : splitName[0].charAt(0)
  }`;

  return initials.toUpperCase();
}
