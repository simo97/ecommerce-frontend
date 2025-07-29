export const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('fr-FR');
};

export const formatDateTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('fr-FR');
};

export const formatDateRange = (startDate: Date | string, endDate: Date | string) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};