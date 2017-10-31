
//1. F# has REPL; 
// Explain basic stuff in repl

// VALUES

//2. declare let binding
//3. explain diff between binding and variable
// simple types
let x = 5
let z = "hello" 

//4. try to mutate... oops "=" is equality operator
// Little historical context: 
// Assignment operator "=" popularized by Fortlan in 1957
// Invented as "equals" by Robert Recorde in 1557...
// shame on you, Fortlan!!!
x = x + 1
//5. tell about immuttability by default
//x <- x + 1

// more complex types
let alist1 = ['a'; 'b']

let aList = [1..10]

let anArray = [|2..3..12|]

let aSeq = seq {22..-2..1}

let aTuple = ("Cool", 12)

let empty = ()

// FUNCTIONS

//6. present function with single argument
//7. Explain interactive output: 
//  input type, output type, 
// "->" means "int transforms/maps to int"

//8. Explain that everything is expression, so there is no 
// "return" statement - very important for functional programming
let add1 a = a + 1
add1 3

// SKIP CURRYING
// Introduce type inference and function signatures instead


// Function bindings also have types and look similar to value bindings

let add a b = a + b
let substract5 a = a - 5.0


// the unit type. lest make side effects
let logToConsole x = printfn "%A" x

logToConsole 12

let logHelloWorld () = logToConsole "Hello world"


// generic params - compiler tries to infer the most generic type
let maxOf a b c = List.max [a;b;c]

// higher order functions

let twice f x = f (f x)

// returning function and partial application
let incrementTwice x = twice (add x)

// little exercises on guessing the type

let sub (x: float) y = x - y 

let dfaq x = x 1 

let pipeInto (e,f) = f e

let ig = ignore (2 * 2)

let waat x f y = f x || y
























//----------------------
// IN CASE SOMEBODY ASKS ABOUT RECURSION
// introduce local rec function to maintain outer function interface
 
let findIndex el l = 
    let rec find index elems = 
        if List.isEmpty elems then
            -1
        else if List.head elems = el then
            index
        else 
            find (index + 1) (List.tail elems)

    find 0 l

findIndex "a" ["a"; "c"; "d"]


let map mapper (arr: 'a []) = 
    let mappedArr = Array.zeroCreate (arr.Length)
    let rec map i = 
        if Array.isEmpty mappedArr then
            Array.empty
        else if i = arr.Length then
            mappedArr
        else                
            mappedArr.[i] <- mapper (arr.[i])
            map (i+1)
    map 0


let genMap mapper col = 
    let arr = Array.ofSeq col
    seq (map mapper arr)




let prepend (el, l) = List.Cons (el, l)

let rec filterList predicate l = 
    if List.isEmpty l then
        []
    else if predicate (List.head l) then
        prepend (List.head l, filterList predicate (List.tail l))
    else
        filterList predicate (List.tail l)


filterList (fun el -> el < 55) [1..100]
filterList (fun el -> el % 15 = 0) [1..100]

let rec where p l = 
    match l with 
    | [] -> []
    | x::xs ->
        if p x then
            x::(where p xs)
        else         
            (where p xs)















// No tail call
let rec filter predicate l =     
    match l with
    | [] -> []
    | x::xs -> 
        if predicate x then
            x::(filter predicate xs)
        else 
            filter predicate xs   

filter (fun el -> el >= 10 ) [1..20000] 
// #time
List.filter (fun el -> el >= 10 ) [1..20000]