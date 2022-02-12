import { format } from 'date-fns';

export const formatAddress = (addr: any) =>
  [
    `${addr.addressLine1 || ''}${addr.addressLine2 ? ` ${addr.addressLine2}` : ''}`,
    `${addr.city || ''}${addr.state ? ` ${addr.state}` : ''}`,
    `${addr.postalCode || ''}`,
  ]
    .filter(Boolean)
    .join(', ');

export const formatAddressCard = (addr: any = {}) =>
  [
    `${addr.addressLine1 || ''}${addr.addressLine2 ? ` ${addr.addressLine2}` : ''}`,
    `${addr.city || ''}`,
    `${addr.state || ''}${addr.postalCode ? ` ${addr.postalCode}` : ''}`,
  ]
    .filter(Boolean)
    .join(', ');

export const formatDate = (date: Date) => format(new Date(date), 'MM-dd-yy');
