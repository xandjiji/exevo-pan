const HIRELING_BASE_VALUE = 150

const MIN_HIRELING_JOB_VALUE = 250
const MAX_HIRELING_JOB_VALUE = 900
const MAX_HIRELING_TOTAL_JOB_VALUE =
  3 * MIN_HIRELING_JOB_VALUE + MAX_HIRELING_JOB_VALUE

const MIN_DRESS_VALUE = 300
const MEDIUM_DRESS_VALUE = 500
const MAX_DRESS_VALUE = 900

const MAX_MEDIUM_SUM = 4 * MEDIUM_DRESS_VALUE

const getJobValue = (jobs: number): number =>
  jobs <= 3 ? jobs * MIN_HIRELING_JOB_VALUE : MAX_HIRELING_TOTAL_JOB_VALUE

const getDressValue = (outfits: number): number => {
  if (outfits === 0) return 0

  let sum = MIN_DRESS_VALUE

  if (outfits >= 6) {
    sum += MAX_MEDIUM_SUM
    sum += (outfits - 5) * MAX_DRESS_VALUE
    return sum
  }

  if (outfits >= 2) {
    sum += (outfits - 1) * MEDIUM_DRESS_VALUE
    return sum
  }

  return sum
}

export default ({ count, jobs, outfits }: HirelingsInfo): number => {
  let sum = 0

  sum += count * HIRELING_BASE_VALUE
  sum += getJobValue(jobs)
  sum += getDressValue(outfits)

  return sum
}
