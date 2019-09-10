let fs=require('fs');

let crearArchivo = base => {    
    let lineas="";
    console.log('==========================='.green);
    console.log(`Tabla del ${base}`.yellow);
    console.log('==========================='.green);
    for(let i=0;i<=10;i++) {
        lineas+=`${base}*${i}=${base*i}\n`;
        console.log(`${base}`.green+`*`.red+`${i}`.yellow+`=`.red+`${base*i}`.underline.white);
    }
    return new Promise((resolve,reject)=> {
        if(!Number(base)) {
            reject('No es un número');
            return;
        }
        let fichero=`./tablas/tabla_${base}.txt`;
        fs.writeFile(fichero,lineas,(err)=> {
            if(err) {
                reject(err)
            } else {
                resolve({
                    data:lineas,
                    fichero:fichero
                });
            };
        });
    });
};

module.exports={
    crearArchivo
};