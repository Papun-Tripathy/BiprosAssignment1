import moment from "moment";
import SleepRecord from "../Record";

// finding for the dupes 

export const isDupe = (a: SleepRecord, b: SleepRecord): boolean => {
	if (a.startValueOf === b.startValueOf && a.endValueOf === b.endValueOf)
		return true;
	return false;
};


export type overLappingType = {
    aOverlappedB?: boolean;
	bOverlappedA?: boolean;
	partialOverlapped?: boolean;
	newRecord?: SleepRecord;
} | null;

// finding for the overlapps
export function overLapping(a: SleepRecord, b: SleepRecord): overLappingType {
	// a is overlapping b
	if (a.startValueOf <= b.startValueOf && a.endValueOf >= b.endValueOf)
		return { aOverlappedB: true };

	// b is overlapping a             !!! it will never occure since a precaution - better to be safe then sorry
	if (b.startValueOf <= a.startValueOf && b.endValueOf >= a.endValueOf)
		return { bOverlappedA: true };

	// if there is a partial overlapped
	// b.startValueOf < a.endValueOf -> this specifies that b starts before a ends
	if (
		a.startValueOf <= b.startValueOf &&
		b.endValueOf >= a.endValueOf &&
		b.startValueOf < a.endValueOf
	) {
		let cStartDuration = moment.duration(a.startValueOf);
		let cEndDuration = moment.duration(b.endValueOf);
		let sleepDuration = cEndDuration.subtract(cStartDuration).asMinutes();

		let newRecord: SleepRecord = new SleepRecord({
			startDateTime: a.startDateTime,
			endDateTime: b.endDateTime,
			sleepDuration,
		});

		return { partialOverlapped: true, newRecord };
	}

	return null;
}
