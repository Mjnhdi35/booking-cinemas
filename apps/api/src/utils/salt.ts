export const getSaltRounds = (defaultRounds: number = 10): number => {
  const rounds = process.env.ROUND
    ? parseInt(process.env.ROUND, 10)
    : defaultRounds

  if (isNaN(rounds) || rounds < 1) {
    throw new Error('Invalid salt rounds')
  }

  return rounds
}
