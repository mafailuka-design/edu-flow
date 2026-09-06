export function formatPrice(price) {
  if (price === 0 || price === "0" || price === false) {
    return "Free";
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

export function formatNumber(num) {
  if (!num && num !== 0) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}
