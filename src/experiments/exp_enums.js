// https://www.typescriptlang.org/docs/handbook/enums.html
// https://2ality.com/2020/01/typescript-enums.html
// https://mariusschulz.com/blog/string-enums-in-typescript
var Test;
(function (Test) {
    Test[Test["A"] = 0] = "A";
    Test[Test["B"] = 1] = "B";
    Test[Test["C"] = 2] = "C";
    Test[Test["D"] = 3] = "D";
})(Test || (Test = {}));
console.log("default number enum starting with 0");
console.log(Test.A);
console.log(Object.keys(Test));
console.log(Object.values(Test));
console.log("accessing with reverse mapping...");
var indexA = Test.A;
console.log(indexA + " -> " + Test[indexA]);
var TestString;
(function (TestString) {
    TestString["A"] = "a";
    TestString["B"] = "b";
    TestString["C"] = "c";
    TestString["D"] = "d";
})(TestString || (TestString = {}));
console.log("string enum");
console.log(Object.keys(TestString));
console.log(Object.values(TestString));
console.log(Object.entries(TestString));
console.log(Object.keys(TestString).map(function (a) { return a.toLowerCase(); }));
var Perm;
(function (Perm) {
    Perm[Perm["UserRead"] = 256] = "UserRead";
    Perm[Perm["UserWrite"] = 128] = "UserWrite";
    Perm[Perm["UserExecute"] = 64] = "UserExecute";
    Perm[Perm["GroupRead"] = 32] = "GroupRead";
    Perm[Perm["GroupWrite"] = 16] = "GroupWrite";
    Perm[Perm["GroupExecute"] = 8] = "GroupExecute";
    Perm[Perm["AllRead"] = 4] = "AllRead";
    Perm[Perm["AllWrite"] = 2] = "AllWrite";
    Perm[Perm["AllExecute"] = 1] = "AllExecute";
})(Perm || (Perm = {}));
function checkPermission(perm) {
    console.log("permission = 0o" + perm.toString(8));
    console.log("0o555? " + (365 === perm));
}
// compiles... because Perm will become just a primtive number...
checkPermission(1023011);
checkPermission(Perm.UserRead | Perm.GroupRead | Perm.AllRead);
checkPermission(Perm.UserRead | Perm.UserExecute | Perm.GroupRead | Perm.GroupExecute | Perm.AllRead | Perm.AllExecute);
var NoYes;
(function (NoYes) {
    NoYes["No"] = "No";
    NoYes["Yes"] = "Yes";
    //Maybe = 'Maybe'
})(NoYes || (NoYes = {}));
function toGerman(value) {
    switch (value) {
        case NoYes.No:
            var x = value;
            return 'Nein';
        case NoYes.Yes:
            var y = value;
            return 'Ja';
        default:
            var z = value;
            throw new TypeError("Unsupported type = " + z);
    }
}
console.log(toGerman(NoYes.No));
