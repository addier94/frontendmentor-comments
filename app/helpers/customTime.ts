export default function getTimeAgo(timestamp:number) {
  const now = new Date();
  const timeDifference = now.getTime() - timestamp;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4.34812); // Approximate number of weeks in a month
  const years = Math.floor(months / 12);

  if (years >= 2) {
    return `${years} years ago`;
  } else if (years === 1) {
    return '1 year ago';
  } else if (months >= 2) {
    return `${months} months ago`;
  } else if (months === 1) {
    return '1 month ago';
  } else if (weeks >= 2) {
    return `${weeks} weeks ago`;
  } else if (weeks === 1) {
    return '1 week ago';
  } else if (days >= 2) {
    return `${days} days ago`;
  } else if (days === 1) {
    return '1 day ago';
  } else if (hours >= 2) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return '1 hour ago';
  } else if (minutes >= 2) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return '1 minute ago';
  } else {
    return 'Just now';
  }
}
