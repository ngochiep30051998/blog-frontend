export function makeid(length = 10) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// Helper
const StringIsNumber = value => isNaN(Number(value)) === false;

// Turn enum into array
export function ToArray(enumme) {
  return Object.values(enumme)
}

export function toAttributes(attributes: any, keyName: string, valueKey: string) {
  return attributes && attributes.filter(x => !!x).reduce((prev: any, curr: any) => ({ ...prev, [curr[keyName]]: curr[valueKey].map((x: any) => x.value) }), {})
}
export const allowMetaKey = (event: KeyboardEvent): boolean => {
  if (
    [
      'Delete',
      'Backspace',
      'Tab',
      'Escape',
      'Enter',
      'NumLock',
      'ArrowLeft',
      'ArrowRight',
      'End',
      'Home'
    ].indexOf(event.key) !== -1 ||
    (event.key === 'a' && (event.ctrlKey || event.metaKey)) ||
    (event.key === 'c' && (event.ctrlKey || event.metaKey)) ||
    (event.key === 'v' && (event.ctrlKey || event.metaKey)) ||
    (event.key === 'x' && (event.ctrlKey || event.metaKey))
  ) {
    return true;
  }
  return false;
}

export const onlyNumber = (event: any, allowKey = '') => {
  if (allowMetaKey(event)) {
    return;
  }
  if (event.key.search(/[^0-9]/) >= 0 && !allowKey.includes(event.key)) {
    event.preventDefault();
  }
}
export function transformReq(data: any) {
  const obj = { ...data };
  Object.keys(obj).forEach(k => obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k]);
  return obj;
}

interface AttributesData {
    [key: string]: string[];
}

export function formatAttributes(attributes: AttributesData): string {
    return Object.entries(attributes)
        .map(([key, values]) => `${key}: ${values.join(', ')}`)
        .join('\n');
}

