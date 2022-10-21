const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

module.exports = {
  apps: [
    {
      name: 'ScrapHistory',
      cwd: __dirname,
      script: 'scrapHistory.sh',
      restart_delay: HOUR * 4,
    },
    {
      name: 'ScrapAuctions',
      cwd: __dirname,
      script: 'scrapAuctions.sh',
      restart_delay: MINUTE * 5,
    },
    {
      name: 'ScrapBosses',
      cwd: __dirname,
      script: 'updateBossChances.sh',
      restart_delay: MINUTE * 10,
    },
    {
      name: 'UpdateStatistics',
      cwd: __dirname,
      script: 'updateStatistics.sh',
      restart_delay: HOUR * 20,
    },
  ],
}
