// https://www.typescriptlang.org/docs/handbook/enums.html
// https://2ality.com/2020/01/typescript-enums.html
// https://mariusschulz.com/blog/string-enums-in-typescript

enum Test {
    A,
    B,
    C,
    D
}
console.log("default number enum starting with 0")
console.log(Test.A)
console.log(Object.keys(Test))
console.log(Object.values(Test))

console.log("accessing with reverse mapping...")
let indexA = Test.A;
console.log(`${indexA} -> ${Test[indexA]}`)

enum TestString {
    A = "a",
    B = "b",
    C = "c",
    D = "d",
}

console.log("string enum")
console.log(Object.keys(TestString))
console.log(Object.values(TestString))
console.log(Object.entries(TestString))

console.log(Object.keys(TestString).map(a => a.toLowerCase()));


enum Perm {
    UserRead     = 1 << 8, 
    UserWrite    = 1 << 7,
    UserExecute  = 1 << 6,
    GroupRead    = 1 << 5,
    GroupWrite   = 1 << 4,
    GroupExecute = 1 << 3,
    AllRead      = 1 << 2,
    AllWrite     = 1 << 1,
    AllExecute   = 1 << 0,
}

function checkPermission(perm: Perm) {
    console.log(`permission = 0o${perm.toString(8)}`);
    console.log(`0o555? ${0o555 === perm}`);
}

// compiles... because Perm will become just a primtive number...
checkPermission(1023011)
checkPermission(Perm.UserRead | Perm.GroupRead | Perm.AllRead)
checkPermission(Perm.UserRead | Perm.UserExecute | Perm.GroupRead | Perm.GroupExecute | Perm.AllRead | Perm.AllExecute)

enum NoYes {
    No = 'No',
    Yes = 'Yes',
    //Maybe = 'Maybe'
}
function toGerman(value: NoYes): string {
    switch (value) {
        case NoYes.No:
            const x: NoYes.No = value;
            return 'Nein';
        case NoYes.Yes:
            const y: NoYes.Yes = value;
            return 'Ja';
        default:
            const z: never = value;
            throw new TypeError("Unsupported type = " + z);
    }
}
console.log(toGerman(NoYes.No))