
/*const fs = require('fs'); //Requiere la libreria JS

let base = 1;

let data="";

for(let i=0;i<=10;i++) {
    data+=`${base}*${i}=${base*i}\n`;
}

fs.writeFile(`tabla-${base}.txt`,data,(err) => {
    if(err) throw err;

    console.log('El archivo ha sido creado');
});*/

const argv=require('yargs').command('app [baseMin] [baseMax]','Tabla de multiplicar', 
    (yargs) => yargs, 
    (argv) => {
                    if(argv.verbose) console.info(`Empezando el calculo de la tabla`)
})
.options('baseMin', {
    alias:'bm',
    default:0
})
.options('baseMax', {
    alias:'bM',
    default:10
}).argv;

const colors=require('colors');

const mult=require('./multiplicar/lib');

//O usar directamente la funcion
const {crearArchivo:miFuncion}=require('./multiplicar/lib');

//Los parametros se encuentran en este objeto

//Sin yargs
/*let argv=process.argv;
let baseMin=argv[2];
let baseMax=argv[3]!=null?argv[3]:baseMin;
*/
let baseMin=argv.baseMin!=null?argv.baseMin:argv.bm;
let baseMax=argv.baseMax!=null?argv.baseMax:argv.bM;

if(!Number(baseMin) || !Number(baseMax)) {
    throw `Las bases indicadas no son númericas ${baseMin} y ${baseMax}`;
} else if(Number(baseMin)>Number(baseMax)) {
    throw `La base minima ${baseMin} es mayor que la base máxima ${baseMax}`;
} else {
    for(let base=Number(baseMin);base<=Number(baseMax);base++) {
        mult.crearArchivo(base).then((data)=> {
            console.log(`Se ha creado el fichero ${data.fichero}`);
        }).catch(err=> {
            console.log(`Error al crear el fichero, ${err}`);
        });
    }
}
