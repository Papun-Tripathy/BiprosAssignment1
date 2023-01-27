import moment from "moment";
type SleepRecordInput = {
	startDateTime: string;
	endDateTime: string;
	sleepDuration: number | string;
};

class SleepRecord {
    
    startDateTime: string;
	endDateTime: string;

	startValueOf: number;
	endValueOf: number;

	sleepDuration: number;

	constructor(data: SleepRecordInput) {
		const { startDateTime, endDateTime, sleepDuration } = data;

		const dateTimeConditions = [
			"DD-MMM-YY hh:mm",
			"DD-MMM-YY hh:mm:ss",
			"DD-MMM-YYYY hh:mm",
			"DD-MMM-YYYY hh:mm:ss",
			"DD-MMMM-YYYY hh:mm",
		];

		this.startValueOf = moment(startDateTime, dateTimeConditions).valueOf();

		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;

		this.endValueOf = moment(endDateTime, dateTimeConditions).valueOf();

		this.sleepDuration = typeof sleepDuration === 'string' ? parseInt(sleepDuration) : sleepDuration;

        if(this.startValueOf > this.endValueOf) {
            this.properPrint();
            throw Error("Input value of endtime is occuring before start time");
        }

		// this.print();
	}

    properPrint(){
        console.log(`${this.startDateTime} \t ${this.endDateTime} \t ${this.sleepDuration}`);
    }

	print() {
		console.log("------------------------------------------");
		console.log(this.startDateTime, this.startValueOf);
		console.log(this.endDateTime, this.endValueOf);
	}
}

export default SleepRecord;
