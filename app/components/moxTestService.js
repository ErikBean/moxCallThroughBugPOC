angular.module('myApp.foo', []).service('moxTestService', function () {
   this.addOne = function (num, message) {
       console.log("From the real function, message: ", message);
       return num+=1;
   }
});