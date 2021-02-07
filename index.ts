import { interval, of, zip } from 'rxjs'; 
import { concatMap, delay, map } from 'rxjs/operators';

// Zip merges two observables into an array that emits when both observables have emitted values. 

const zipValues = of(
  {key:1, name: 'one', source:'zip'}, 
  {key:2, name: 'two', source:'zip'}, 
  {key:3, name: 'three', source:'zip'}, 
  {key:4, name: 'four', source:'zip'}, 
  {key:5, name: 'five', source:'zip'}, 
  {key:6, name: 'six', source:'zip'});

const testZip = zip(zipValues, interval(1000)).pipe(
  map((value) => value[0])
);

testZip.subscribe(console.log);

// this method uses concatMap to merge the source observable with an interval observable. //ConcatMap waits for both the source and the inner observable (in this case the interval) to //complete before moving to the next value on the source observable.

const concatValues = of(
  {key:1, name: 'one', source:'concat'}, 
  {key:2, name: 'two', source:'concat'}, 
  {key:3, name: 'three', source:'concat'}, 
  {key:4, name: 'four', source:'concat'}, 
  {key:5, name: 'five', source:'concat'}, 
  {key:6, name: 'six', source:'concat'});

const testConcatMap = concatValues.pipe(
  concatMap((value) => of(value).pipe(delay(1000)))
);

testConcatMap.subscribe(console.log);
