// Access to .NET ecosystem
// Next Everything is expression 

open System
open System.IO

let maleFirstNames = 
    [|
        "georgi"
        "hristo"
        "dimitar"
        "borislav"
        "zdravko"
        "miladin"
        "samuil"
        "kiro"    
    |]

let maleLastNames = [|
    "georgiev"
    "ivanov"
    "jelqzkov"
    "stoqnov"
    "zdravkov"
    "vladimirov"
    "simeonov"
    "kirov"    
|]

let femaleFirstNames = [|
    "gergana"
    "hristina"
    "monika"
    "nadejda"
    "miroslava"
    "petya"
    "elena"
    "izabela"    
|]

let femaleLastNames = [|
    "georgieva"
    "ivanova"
    "trifonova"
    "nikolova"
    "evtimova"
    "danova"
    "popova"
    "ninova"    
|]

let genders = [|"m";"f"|]

let hobbies = [|
    "rock" 
    "latino"
    "hip-hop"
    "football"
    "tenis"
    "basketball"
    "Star Wars"
    "Rado Shisharkata"
    "Red wine"
|]

let generatePerson (rand: Random) =     
    // local functions
    let getRandomValue (arr: 'a []) =
        let i = rand.Next (arr.Length)
        arr.[i]

    let personGender = getRandomValue genders
    // everything is expression, including "if"
    // the infamous tuple, presented by Krasi
    let (firstNames, lastNames) = 
        if personGender = "m" then
            maleFirstNames, maleLastNames
        else 
            femaleFirstNames, femaleLastNames
    
    // Binding can contain local bindings
    let personHobbies =
        let hobbiesCount = getRandomValue([|1..hobbies.Length / 2|])
        // Binding shadowing
        let hobbies = 
            Array.map (fun _ -> getRandomValue hobbies) [|0..hobbiesCount|]             
        String.Join(";", Array.distinct hobbies)

    sprintf "%s %s, %s, %i, [%s]"
        (getRandomValue firstNames)
        (getRandomValue lastNames)
        personGender
        (getRandomValue [|0..99|])    
        personHobbies

let generatePersons count = 
    let rand = Random()
    Array.init count (fun _ -> generatePerson rand)

// #time
File.WriteAllLines (__SOURCE_DIRECTORY__ + "/names.txt", generatePersons 2000)
