#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .command({
        command: 'current',
        description: 'Текущая дата и время в формате ISO',
    })
    .command({
        command: 'add',
        description: 'Получить дату в будущем',
    })
    .command({
        command: 'sub',
        description: 'Получить дату в прошлом',
    })
    .option('year', {
        alias: 'y',
        type: "boolean",
        description: "Год"
    })
    .option('month', {
        alias: "m",
        type: "boolean",
        description: "Месяц"
    })
    .option('date', {
        alias: "d",
        type: "boolean",
        description: "Календарная дата"
    })
    .argv;

class DateUtility {
    constructor() {
        this.date = new Date();
        this.command = argv._[0];
        this.count = argv._[1];
        this.yearArg = argv.y || argv.year;
        this.monthArg = argv.m || argv.month;
        this.dateArg = argv.d || argv.date;

        this.init();
    }

    init() {
        this.getCurrentDate();
        this.getAddDate();
        this.getSubDate();
    }

    get isArgumentsSet() {
        return this.yearArg && this.monthArg && this.dateArg;
    }

    get isCurrentCommand() {
        return this.command === 'current';
    }

    get isAddCommand() {
        return this.command === 'add';
    }

    get isSubCommand() {
        return this.command === 'sub';
    }

    getCurrentDate() {
        if (!this.isCurrentCommand) {
            return;
        }
        if (!this.isArgumentsSet) {
            console.log(this.date.toISOString());
        }
        if (this.yearArg) {
            console.log(this.date.getFullYear());
        }
        if (this.monthArg) {
            console.log(this.date.getMonth());
        }
        if (this.dateArg) {
            console.log(this.date.toLocaleString('ru-RU', { timeZone: 'UTC' }));
        }
    }

    getAddDate() {
        if (!this.isAddCommand && !this.isArgumentsSet) {
            return;
        }
        if (this.yearArg) {
            this.date.setFullYear(this.date.getFullYear() + this.count);
            console.log(this.date.toISOString());
        }
        if (this.monthArg) {
            this.date.setMonth(this.date.getMonth() + this.count);
            console.log(this.date.toISOString());
        }
        if (this.dateArg) {
            this.date.setDate(this.date.getDate() + this.count);
            console.log(this.date.toISOString());
        }
    }

    getSubDate() {
        if (!this.isSubCommand && !this.isArgumentsSet) {
            return;
        }
        if (this.yearArg) {
            this.date.setFullYear(this.date.getFullYear() - this.count);
            console.log(this.date.toISOString());
        }
        if (this.monthArg) {
            this.date.setMonth(this.date.getMonth() - this.count);
            console.log(this.date.toISOString());
        }
        if (this.dateArg) {
            this.date.setDate(this.date.getDate() - this.count);
            console.log(this.date.toISOString());
        }
    }
}

const my = new DateUtility();
