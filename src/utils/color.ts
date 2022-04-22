export function randomColor() {
  const r = Math.floor(Math.random() * 155) + 100
  const g = Math.floor(Math.random() * 155) + 100
  const b = Math.floor(Math.random() * 155) + 100

  return 'rgba(' + r + ',' + g + ',' + b + ',0.95)'
}
