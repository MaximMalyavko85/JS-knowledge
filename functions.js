/* 
* Функции в Js бывают function declaration (function main(){}) и function expression (()=>{}).
*/

/* 
* Функции декларирования - обычные функции
  1. У стрелочных функций определен свой this. Он определяется в момент вызова
  2. 
*/

/* 
  Стрелочные функции: 
  1. Главное, для чего создали стрелочные функции - это отсутствие своего this. Он берется откуда-то снаружи.
  this определяется в момент создания функции
  2. Краткая запись
  3. Не имеют arguments
*/

"use strict";

function globalFunction() {
  console.log(this);
}

const globalArrowFunction = () => {
  console.log(this);
}

//globalFunction();  // в глобальном контексте undefined
//globalArrowFunction(); // window

const cat = {
  name: "Pirat",
  globalFunction,
  globalArrowFunction,
}

// В контексте обьекта
console.log("Object context")
cat.globalFunction(); // вернет обьект cat, так как this при вызове функций, обьявленных через function(){}, будет равен обьекту перед точкой.
cat.globalArrowFunction(); // вернет обьект window. this в стрелочных функциях определяется в момент ее создания, а, когда мы ее создавали, значение this было undefined/Window

const dog = { // у обьекта нет контекста. Только Область видимости [[SCOPE]].
  name: "Viking",
  localFunction: function() {
    console.log(this)
  },
  // у родителя породившей сущности. У нее нет своего контекста, и некуда записывать this
  // он не хранит this. В момент вызова про localArrowFunction ничего не известно, т.к. она 
  // undefined. Она начинает описываться и сразу исполняться. Ее вызывает контекст функции.
  // В данном случае он глобальный.
  localArrowFunction: () => {
    console.log(this)
  }
}

console.log("Object context Dog")
dog.localFunction(); // Dog. Потому что обьект перед точкой dog
dog.localArrowFunction(); // Window/undefined - потому что внутри обьекта this- это так же глобальный обьект


/* const pets = {
  name: "PETS",
  localFunction: function () { // у этой this - обьект перед точкой . => PETS
    //1-
    const arrowFunctionInLocalFunction = () => { console.log(this);} // PETS // this определяется в момент описания и равная родителю
    //2-
    function functionInLocalFunction() { console.log(this); } // undefined
    arrowFunctionInLocalFunction();
    functionInLocalFunction(); // this определяется в момент вызова
  },
  localArrowFunction: () => { // ()=> вот эта функция ссылается на глобал, так как она берет this у вызывающего контекста. А вызывающий контекст - это window, так как у обьекта нет котекста.
    //3-
    const arrowFunctionInLocalArrowFunction = () => { console.log(this);} // window/undefined
    //4-
    function functionInLocalArrowFunction() { console.log(this);} // undefined
    arrowFunctionInLocalArrowFunction();
    functionInLocalArrowFunction();
  }
}

console.log("========>")
pets.localFunction();
pets.localArrowFunction(); */

/* 
* Когда мы создавали обьект - мы записали ему функцию localFunction. Для нее this - это обьект перед точкой => pets
1 - arrowFunctionInLocalFunction создается в момент вызова localFunction и запоминает значение this, которое было в месте ее создания.
2 - functionInLocalFunction - значение this определяется в момент вызова и равно обьекту перед точкой. 
  В данном случае у нас нет обьекта перед точкой - this - глобальный обьект

  3- arrowFunctionInLocalArrowFunction создается внутри такой же стрелочной функции. Стрелочные функции в момент обьявления записывают в this значение из своего окружения. Однако, наша функция создана внутри стрелочной функции для которой this - undefind. А значит, для arrowFunctionInLocalArrowFunction this будет равен undefind

  4 - по той же причине, что и пункт 2
*/


const test = {
  name: "JONNY",
 /*   arrowFunction: () => {
    console.log(this.name)
  }, */

  createArrowFunction: function () {
    return () => {
    // не имеет собственного контекста выполнения и наследует this && arguments от родительского контекста
    // родительский контекст - createArrowFunction, и this у него test, так как справо от этой функции
    // стоит test
      console.log(this.name)
      console.log(arguments)
    }
  },
  createAnonFunction: function () {
    return function () {
      // Вот у этой анонимной функции есть собственный контекст.
      // По-этому, когда идет обращение к this.name, this.name ищется в своем контексте - а там такого нет
      console.log(this.name)
      console.log(arguments)
    }
  }
}

//console.log("Call arrowFunction")
//test.arrowFunction("args arrow"); 
console.log("arrow ()=>")
test.createArrowFunction("args arrow2")();
console.log("declaration function name(){}")
test.createAnonFunction("args anon")();