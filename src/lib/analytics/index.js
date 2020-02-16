export const ymGoal = goal => {
  if (window?.ym) {
    window.ym(process.env.GATSBY_YM_ID, 'reachGoal', goal)
    console.log(process.env.GATSBY_YM_ID, 'reachGoal', goal)
  } else {
    console.error('YM is not found')
  }
}
