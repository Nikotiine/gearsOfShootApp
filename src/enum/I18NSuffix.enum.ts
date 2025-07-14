export enum I18NSuffix {
  SUMMARY = 'summary',
  DELETED = 'deleted',
  UPDATED = 'updated',
  CREATED = 'created'
}
export function getI18NPrefix(name: string): string {
  return name + '.'
}
