// Types - Records
// The forward pipe operator
// Function composition

open System

let names = [|
    "stefan uzunov, m, 32"
    "gergana ivanova, f, 42"    
    |]


// type - Record
type Person = {
    Name: string
    Gender:string
    Age: int
    Hobbies: string []
}

// 1. type inference needs help with objects` methods
// let splitStr delimiters str =
//     str.Split(delimiters, StringSplitOptions.RemoveEmptyEntries)

// 2. type inference needs help with method overloading    
// let splitStr delimiters (str: string) =
//     str.Split(delimiters, StringSplitOptions.RemoveEmptyEntries)

let splitStr (delimiters: char []) (str: string) =
    str.Split(delimiters, StringSplitOptions.RemoveEmptyEntries)

let trim (str: string) = str.Trim() 

// normal way
// let getPersonInfo info = splitStr [|','|] info


// Now, lets start using partial application
// first-class function can be bint to identifier 
// Partial application helps in specializing functions 
// improves readability
let getPersonInfo = splitStr [|','|]


// initial declaration - before removing the lambda

// let getPerson person =
//     let personInfo = 
//         Array.map (fun info -> trim info) (getPersonInfo person)
//
//     {
//         Name = personInfo.[0]
//         Gender = personInfo.[1]
//         Age = int (personInfo.[2])
//     }
let getPerson person =
    let getHobbies = splitStr [|';'|]
    let trimBrackets (s: string) = s.[1..s.Length - 2] 

    let personInfo = Array.map trim (getPersonInfo person)
    {
        Name = personInfo.[0]
        Gender = personInfo.[1]
        Age = int (personInfo.[2])
        // functions gives us control over when to get result of function 
        Hobbies = getHobbies (trimBrackets (personInfo.[3]))
    }

// test 
// let personsInfo = 
//     Array.map getPerson names

(*
    Read the file with people and get personsInfo
*)

// In demo no problem, but in real project at start
open System.IO

let namesPath = __SOURCE_DIRECTORY__ + "/names.txt"
let personsInfo = 
    Array.map getPerson (File.ReadAllLines namesPath)

(*
    // Capitalize first name
    for given member of the list
    get people with 3th most met first name ordered by age and displayed:
    (Name: LastName, FirstName; Age: age)
    group by first name
    
    display by (Name: LastName, FirstName; Age: age)

*)

// function specialization
let getFirstAndLastName = splitStr [|' '|]
let capitalize (str: string) = 
    string (str.ToUpper().[0]) + str.[1..]

let getFirstName person = 
    (getFirstAndLastName person.Name).[0]

let peopleByFirstName = Array.groupBy getFirstName personsInfo

let thirdMostCommonFirstNamePeople =
    let sortedPeople = 
        // Tuple destructuring in lambda`s argument
        Array.sortBy (fun (_, people) -> Array.length people) peopleByFirstName
    let (_, people) = sortedPeople.[2]
    people    

let toDisplayFormat person =
    let firstAndlastName = 
        Array.map capitalize (getFirstAndLastName (person.Name))

    sprintf "Name: %s, %s; Age: %i; Hobbies: [%s]"
        (Array.last firstAndlastName)
        (Array.head firstAndlastName)
        (person.Age)
        (String.Join(", ", (Array.sort person.Hobbies)))

let res = Array.map toDisplayFormat thirdMostCommonFirstNamePeople

// Can we do better?

// our first library - fluent interfaces
// little offtopic - prefix vs inflix
5 + 6 // inflix
(+) 5 6 // prefix

// forward-pipe
let (|>) x f = f x

let getThirdMostCommonFirstNamePeople peopleByFirstName =
    let sortedPeople = 
        // In demo: refactor using function composition
        Array.sortByDescending (fun (_, people) -> 
            Array.length people
        ) peopleByFirstName

    let (_, people) = sortedPeople.[2]
    people

(File.ReadAllLines namesPath) 
|> Array.map getPerson 
|> Array.groupBy getFirstName
|> getThirdMostCommonFirstNamePeople
|> Array.map toDisplayFormat


// What else can be improved?

// function-composition
let (>>) f g x = g (f x) 

// refactor original function to be highly functional
let getThirdMostCommonFirstNamePeopleRef =
    Array.sortByDescending (snd >> Array.length)
    >> Array.item 3
    >> snd

let toDisplayFormatRef person =
    let firstAndlastName = 
        (getFirstAndLastName >> Array.map capitalize) person.Name

    sprintf "Name: %s, %s; Age: %i; Hobbies: [%s]"
        (Array.last firstAndlastName)
        (Array.head firstAndlastName)
        (person.Age)
        (String.Join(", ", (Array.sort person.Hobbies)))

let y = 
    (File.ReadAllLines namesPath) 
    |> Array.map getPerson 
    |> Array.groupBy getFirstName
    |> getThirdMostCommonFirstNamePeopleRef
    |> Array.map toDisplayFormatRef


let groupByHobbies person = 
    Array.map (fun h -> h, person) person.Hobbies

let y2 = 
    (File.ReadAllLines namesPath) 
    |> Array.map getPerson 
    |> Array.collect groupByHobbies    
    |> Array.groupBy fst
    // similar to getThirdMostCommonFirstNamePeopleRef?
    |> ((Array.sortByDescending (snd >> Array.length)) >> Array.item 3 >> snd)
    |> Array.map (snd >> toDisplayFormatRef)
