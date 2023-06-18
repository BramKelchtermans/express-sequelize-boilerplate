class Job {
    cron(template) {
        var cron = require('node-cron');
        cron.schedule(template, this.fire);
    }

    everyFiveSeconds() {
        this.cron('*/5 * * * * *')
    }

    everyMinute() {
        this.cron('* * * * *');
    }

    everyTwoMinutes() {
        this.cron('*/2 * * * *');
    }

    everyThreeMinutes() {
        this.cron('*/3 * * * *');
    }

    everyFourMinutes() {
        this.cron('*/4 * * * *');
    }

    everyFiveMinutes() {
        this.cron('*/5 * * * *');
    }

    everyTenMinutes() {
        this.cron('*/10 * * * *');
    }

    everyFifteenMinutes() {
        this.cron('*/15 * * * *');
    }

    everyThirtyMinutes() {
        this.cron('0,30 * * * *');
    }

    hourly() {
        this.cron('0 * * * *');
    }

    hourlyAt(minutes) {
        const expression = `${minutes} * * * *`;
        this.cron(expression);
    }

    everyOddHour() {
        this.cron('1-23/2 * * * *');
    }

    everyTwoHours() {
        this.cron('0 */2 * * *');
    }

    everyThreeHours() {
        this.cron('0 */3 * * *');
    }

    everyFourHours() {
        this.cron('0 */4 * * *');
    }

    everySixHours() {
        this.cron('0 */6 * * *');
    }

    daily() {
        this.cron('0 0 * * *');
    }

    dailyAt(time) {
        const expression = `${time} * * *`;
        this.cron(expression);
    }

    twiceDaily(hour1, hour2) {
        const expression = `0 ${hour1},${hour2} * * *`;
        this.cron(expression);
    }

    twiceDailyAt(hour1, hour2, minutes) {
        const expression = `${minutes} ${hour1},${hour2} * * *`;
        this.cron(expression);
    }

    weekly() {
        this.cron('0 0 * * 0');
    }

    weeklyOn(day, time) {
        const expression = `${time} * * ${day}`;
        this.cron(expression);
    }

    monthly() {
        this.cron('0 0 1 * *');
    }

    monthlyOn(day, time) {
        const expression = `${time} ${day} * *`;
        this.cron(expression);
    }

    twiceMonthly(day1, day2, time) {
        const expression = `${time} ${day1},${day2} * *`;
        this.cron(expression);
    }

    lastDayOfMonth(time) {
        const expression = `${time} L * *`;
        this.cron(expression);
    }

    quarterly() {
        this.cron('0 0 1 */3 *');
    }

    quarterlyOn(day, time) {
        const expression = `${time} ${day} */3 *`;
        this.cron(expression);
    }

    yearly() {
        this.cron('0 0 1 1 *');
    }

    yearlyOn(month, day, time) {
        const expression = `${time} ${day} ${month} *`;
        this.cron(expression);
    }

    timezone(timezone) {
        cron.tz(timezone);
    }

    async fire() {
        throw new Error('Please implement a method');
    }
}

module.exports = {
    Job
}
