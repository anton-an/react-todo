export default function formatTime(seconds) {
  let min = Math.floor(seconds / 60)
  let sec = seconds - min * 60
  if (min < 10) {
    min = `0${min}`
  }
  if (sec < 10) {
    sec = `0${sec}`
  }
  return `${min}:${sec}`
}
