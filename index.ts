import { interval, of, zip } from 'rxjs'; 
import { concatMap, delay,  distinctUntilChanged, catchError, map } from 'rxjs/operators';

const incomingValues = of({key:1, name: 'one'}, {key:3, name: 'three'}, {key:6, name: 'three'}, {key:7, name: 'three'}, {key:2, name: 'two'}, {key:4, name: 'four'});

const source = incomingValues.pipe(
  distinctUntilChanged((value, val) => value.name === val.name),
  concatMap(x => of(`Hello ${x.name}!`).pipe(delay(1000))),
  catchError((error) => {
    console.log('IN error');
    return of(error);
  })
);

//source.subscribe(console.log, console.log, console.log);

const testZip = zip(incomingValues, interval(1000)).pipe(map((value) => value[0]));

testZip.subscribe(console.log, console.log, console.log);

const testConcatMap = incomingValues.pipe(
  concatMap((value) => of(value).pipe(delay(1000)))
);

testConcatMap.subscribe(console.log, console.log, console.log);
