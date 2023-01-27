import SleepRecord from "./Record";
import data from "./Data";
import { isDupe, overLapping } from "./DataOperation";

try {
	let totalTime: number = 0;

	let rawDataList: Array<SleepRecord> = [];
	data.forEach((d) => {
		const val = new SleepRecord(d);
		rawDataList.push(val);
	});

	rawDataList.sort((a, b) => b.endValueOf - a.endValueOf);
	rawDataList.sort((a, b) => a.startValueOf - b.startValueOf);

	// removing dupes
	let size = rawDataList.length - 1;
	for (let i = 0; i < size; i++) {
		while (isDupe(rawDataList[i], rawDataList[i + 1])) {
			let a1 = rawDataList.slice(0, i);
			let a2 = rawDataList.slice(i + 1);
			rawDataList = [...a1, ...a2];
			size--;
		}
	}

	//check overlaps
	size = rawDataList.length - 1;
	for (let i = 0; i < size; i++) {
		const overLappingResult = overLapping(rawDataList[i], rawDataList[i + 1]);

		if (overLappingResult?.aOverlappedB) {
			let a1 = rawDataList.slice(0, i + 1);
			let a2 = rawDataList.slice(i + 1);
			a2.shift();
			rawDataList = [...a1, ...a2];
			size--;
			i--;
		} else if (
			overLappingResult?.partialOverlapped &&
			overLappingResult?.newRecord
		) {
			let a1 = rawDataList.slice(0, i);
			let a2 = rawDataList.slice(i + 1);
			a2.shift();
			rawDataList = [...a1, overLappingResult.newRecord, ...a2];
			size--;
			i--;
		}
	}

	rawDataList.forEach((d) => {
		d.properPrint();
		totalTime += d.sleepDuration;
	});

	console.log("Total time:", totalTime);
} catch (error: any) {
	console.error(error.message ?? error);
}
