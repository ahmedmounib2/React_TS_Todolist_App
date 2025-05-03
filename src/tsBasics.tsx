import React from 'react';
import './App.css';
import { log } from 'console';

let name: string;
let type: any; // defining a variable that can have any type of data recommended to use type unknown instead
let day: unknown;

let age: number | string; // using union to define a variable so it can be both a number or a string with pipe symbol "|", now we can assign age as a number or a string
let isStudent: boolean;
let hobbies: string[]; // variable contain only an array of strings
let role: [number, string]; // declare a tupil in TS

let printName: (name: string) => void; // defining a function type that returns undefine (never instead of void will return nothing)

// //declare objects in TS
// type Person = {
//   name: string;
//   age?: number; //question mark following the property to make it an optional property
// };

// // declare another variable that have an array of person objects
// let lotsOfPeople: Person[];

// let person: Person = {
//   name: "Ahmed",
// };
interface Person {
  // can also extend type Y with interface Person
  name: string;
  age?: number; //question mark following the property to make it an optional property
}

interface Guy extends Person {
  profession: string;
}

type X = Person & {
  a: string;
  b: number;
};

type Y = {
  c: string;
  d: number;
};

// type X = {
//   a: string;
//   b: number;
// };

// type Y = X & {
//   // now we included the X values a and b in type Y using X &, so type Y have values a, b, c, d
//   c: string;
//   d: number;
// };

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
