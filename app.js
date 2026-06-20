const questions = [
{
code:"MENTE24",
q:"¿Quien es el padre de la psicología?",
o:[
"Wilhelm Wundt",
"Papi Freud",
"William James",
"René Descartes"
],
a:0
},

{
code:"JUSTICIA31",
q:"¿Qué institución se encarga de aplicar las leyes e impartir justicia?",
o:[
"El Poder Legislativo",
"Poder Judicial",
"El Tribunal Electoral",
"Diosito"
],
a:1
},

{
code:"MENSAJE42",
q:"En una conversación entre 2 personas. ¿Quién recibe el mensaje?",
o:[
"El Receptor",
"El Emisor",
"El Recibidor",
"El Oyente"
],
a:0
},

{
code:"LIDER55",
q:"¿Qué es un líder?",
o:[
"El miembro más antiguo, experto o capacitado de un equipo.",
"Quien influye y guía a un grupo",
"Una persona carismática y motivadora que le cae bien a todo el mundo.",
"Alguien que tiene autoridad."
],
a:1
},

{
code:"BALANCE67",
q:"¿Qué ayuda a controlar los gastos?",
o:[
"Tener un buen historial crediticio",
"Un presupuesto",
"Guardar el dinero sobrante a fin de mes",
"Ingresar dinero a Nu"
],
a:1
},

{
code:"UDL79",
q:"¿Cuál es el propósito principal de Travesía UDL Integra?",
o:[
"Integrar estudiantes de distintas áreas",
"Competir entre carreras",
"Conseguir ligue de otra carrera",
"Porque se nos ocurrio"
],
a:0
},

{
code:"EQUIPO88",
q:"¿Cuál es el idioma más hablado del mundo por número de hablantes nativos?",
o:[
"Ingles",
"Chino mandarin",
"Ruso",
"Español"
],
a:1
},

{
code:"INTEGRA99",
q:"¿Qué número romano representa el 67?",
o:[
"XLIIV",
"XLVII",
"LXVII",
"LVXII"
],
a:2
}
];

let current =
parseInt(localStorage.getItem("travesia")) || 0;

updateBar();

function updateBar(){

const progress =
(current / questions.length) * 100;

document.getElementById("bar").style.width =
progress + "%";

updateStationTitle();

}

function checkCode(){

const code =
document.getElementById("codeInput")
.value
.trim()
.toUpperCase();

if(code === "PORTAVOZADMIN"){

openAdminPanel();
return;

}

if(current >= questions.length){

alert("Travesía completada");
return;

}

if(code === questions[current].code){

showQuestion();

}else{

alert("Código incorrecto");

}

}

function openAdminPanel(){

let station = prompt(
`Panel de Administrador

Selecciona estación:

1 - Psicología
2 - Derecho
3 - Comunicación
4 - Administración
5 - Contaduría
6 - Portavoces UDL
7 - Interdisciplinaria
8 - Final`
);

if(station){

current =
Math.max(
0,
Math.min(
7,
parseInt(station)-1
)
);

localStorage.setItem(
"travesia",
current
);

updateBar();

alert(
"Movido a estación " +
(station)
);

}

}

function showQuestion(){

document.getElementById("codeScreen")
.style.display = "none";

document.getElementById("questionScreen")
.style.display = "block";

document.getElementById("question")
.innerText =
questions[current].q;

const optionsDiv =
document.getElementById("options");

optionsDiv.innerHTML = "";

questions[current].o.forEach(
(option,index)=>{

const btn =
document.createElement("button");

btn.className = "option";

btn.innerText = option;

btn.onclick = ()=>{

answer(index);

};

optionsDiv.appendChild(btn);

});

}

function answer(index){

if(index === questions[current].a){

showSuccess();

}else{

showFail();

}

}

function showSuccess(){

confetti({

particleCount:150,
spread:100,
origin:{y:0.6}

});

document.body.innerHTML = `

<div class="success">

<h1>
🏃 CORRAN A LA SIGUIENTE ESTACIÓN 🏃
</h1>

</div>

`;

setTimeout(()=>{

current++;

localStorage.setItem(
"travesia",
current
);

if(current >= questions.length){

document.body.innerHTML = `

<div class="success">

<h1>
🎉 TRAVESÍA COMPLETADA 🎉
</h1>

<h2>
Dirígete con los Portavoces UDL
</h2>

</div>

`;

}else{

location.reload();

}

},3000);

}

function showFail(){

let seconds = 5;

document.body.innerHTML = `

<div class="fail">

<h1>
⏳ ESPERA 5 SEGUNDOS
</h1>

<div
id="timer"
class="timer">

5

</div>

</div>

`;

const countdown =
setInterval(()=>{

seconds--;

document.getElementById("timer")
.innerText =
seconds;

if(seconds <= 0){

clearInterval(countdown);

document.body.innerHTML = `

<div class="success">

<h1>
🏃 CORRAN A LA SIGUIENTE ESTACIÓN 🏃
</h1>

</div>

`;

setTimeout(()=>{

// AVANZAR DE ESTACIÓN
current++;

localStorage.setItem(
"travesia",
current
);

// SI YA TERMINARON TODAS
if(current >= questions.length){

document.body.innerHTML = `

<div class="success">

<h1>
🎉 TRAVESÍA COMPLETADA 🎉
</h1>

<h2>
Dirígete con los Portavoces UDL
</h2>

</div>

`;

}else{

location.reload();

}

},3000);

}

},1000);

}


function resetGame(){

localStorage.removeItem(
"travesia"
);

location.reload();

}

function updateStationTitle(){

if(current < questions.length){

document.getElementById("stationTitle").innerText =
`Coloca la contraseña de la Estación ${current + 1}`;

}else{

document.getElementById("stationTitle").innerText =
"Travesía completada";

}

}