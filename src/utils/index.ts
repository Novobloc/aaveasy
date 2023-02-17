export function ellipseAddress(address = "", width = 10): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
