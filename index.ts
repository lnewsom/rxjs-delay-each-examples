import { interval, from, of, Subject, zip } from "rxjs";
import { concatMap, delay, map, take, tap } from "rxjs/operators";

// Delay puts a delay on each incoming value but does not delay the reading of the incoming values. The result is that it looks like the delay is only at the beginning of the subscription.

const delayValues = from([
  { key: 1, source: "delay" },
  { key: 2, source: "delay" },
  { key: 3, source: "delay" },
  { key: 4, source: "delay" },
  { key: 5, source: "delay" },
  { key: 6, source: "delay" }
]);

const testDelay = delayValues.pipe(delay(1000));

testDelay.subscribe(console.log);

// Spacing out the values coming in from the source observable illustrates that the delay is applied to each value on the outgoing end of the value.

const valueSubject = new Subject();

let index = 0;

const passValue = () => {
  index++;
  valueSubject.next({ key: index, source: "delaySpaced" });
};

setInterval(passValue, 500);

const testDelaySpace = valueSubject.pipe(
  take(6),
  tap((value: { key; source }) => console.log("ENTER", value.key)),
  delay(1000),
  tap(value => console.log("LEAVE", value.key))
);

testDelaySpace.subscribe(console.log);

// Zip merges two observables into an array that emits when both observables have emitted values.

const zipValues = from([
  { key: 1, source: "zip" },
  { key: 2, source: "zip" },
  { key: 3, source: "zip" },
  { key: 4, source: "zip" },
  { key: 5, source: "zip" },
  { key: 6, source: "zip" }
]);

const testZip = zip(zipValues, interval(1000)).pipe(map(value => value[0]));

testZip.subscribe(console.log);

// this method uses concatMap to merge the source observable with an interval observable. //ConcatMap waits for both the source and the inner observable (in this case the interval) to //complete before moving to the next value on the source observable.

const concatValues = from([
  { key: 1, source: "concat" },
  { key: 2, source: "concat" },
  { key: 3, source: "concat" },
  { key: 4, source: "concat" },
  { key: 5, source: "concat" },
  { key: 6, source: "concat" }
]);

const testConcatMap = concatValues.pipe(
  concatMap(value => of(value).pipe(delay(1000)))
);

testConcatMap.subscribe(console.log);
