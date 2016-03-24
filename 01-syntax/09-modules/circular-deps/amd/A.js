define(["amd/B"], function(B){

    console.log("Loaded dependency to: " + B);

    var A = "Module A (AMD)";

    console.log("Loaded: " + A);

    return A;
});