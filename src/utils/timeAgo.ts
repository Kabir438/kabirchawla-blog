export default function timeAgo(timestamp: number, now?: number): string {
    const n = now || Date.now();
    const seconds = Math.floor((n - timestamp) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return seconds <= 5 ? "just now" : `${seconds} seconds ago`;
    } if (minutes < 60) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } if (hours < 24) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } if (days < 7) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } if (weeks < 4) {
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } if (months < 12) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    } if (years < 2) {
        return "1 year ago";
    }
    return `${years} years ago`;
}