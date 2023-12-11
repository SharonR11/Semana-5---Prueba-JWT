
const express = require('express');//llamada de express
const jwt = require("jsonwebtoken");//Invoca a la libreria de jwt
const config = require('./public/scripts/config');

const app = express();//inicializa la constante express
app.use(express.json());
app.use(express.urlencoded({extended: false}));//directiva para usar o no json

app.all('/user',(req, res, next) => {// cuando sea user va a poder ingresar
    console.log('Por aqui pasamos');
    next();
});


//********User*********// primer empoit // tipo get
app.get('/', (req, res) => {// AL LLAMADO DEL DOMINIIO SE INVOCA ESTA SECCION 
    res.sendFile(__dirname + '/public/login.html');//este empoit llama al archivo login.html
});
app.get('/index2', (req, res) => {// AL LLAMADO DEL DOMINIIO SE INVOCA ESTA SECCION 
    res.sendFile(__dirname + '/public/index.html');//este empoit llama al archivo login.html
});


app.get('/register', (req, res) => {//empoit llamado register
    res.sendFile(__dirname + '/public/register.html');
});

app.post('/signup', (req, res) => {//posteos

    console.log(`Post pagina de login ${req.body.username} `);//saca e imprime el username
    console.log(`Post pagina de login ${req.body.password} `);//
    
    if(`${req.body.username}` === 'sharonrudas' //lo que venga en el username debe ser identicamente igual a juam perex
           && `${req.body.password}` === '120511'){//debe ser identicamente igual a 29
            console.log('Nombre: ' + `${req.body.username}` + ', Password: ' + `${req.body.password}`);//muestra en consola
            const user = {//creamos una constante de tipo json
                nombre : `${req.body.username}`,
                password: `${req.body.password}`
            }
            //utilización de la libreria de JWT,  saing crea un tocken. 
            jwt.sign({ user: user }, 'secretkey', { expiresIn: '300s' }, (err, token) => {
                if (err) {
                    // Manejo del error al generar el token
                    console.error('Error al generar el token:', err);
                    return res.status(500).json({ error: 'Error al generar el token' });
                }
                console.log('Token generado:', token); // Imprimir el token en la terminal
                res.json({ token: token }); // Enviar el token como respuesta al cliente
            });
            //window.location.href = '/index.html'
            res.redirect(303,'/index.html');
            

    }
    else{//si la validación no sucede.. imprime error
            return res.status(401).json({//retorna un status de erroe
                auth: false,
                message: 'No token provided'//devolvera en el json.. no hay token :xd
            });
    }
    
});
//unidervol es un metodo que esta llamada en intermedio-- se ejecuta cuando termina el miderwol.. se ejecutan las demas sentencias
// ... (otras rutas y configuraciones)

// app.post('/signin', verifyToken, (req, res) => {
//     // El middleware verifyToken ya ha colocado el token en req.token si existe
//     if (req.token) {
//         jwt.verify(req.token, 'secretkey', (err, authData) => {
//             if (err) {
//                 console.error('Error en la verificación del token:', err);
//                 res.status(401).json({
//                     auth: false,
//                     message: 'Token inválido o expirado'
//                 });
//             } else {
//                 console.log('Token verificado con éxito');
//                 res.redirect(303,'/index.html');
//             }
//         });
//     } else {
//         res.status(401).json({
//             auth: false,
//             message: 'Token faltante'
//         });
//     }
// });
// ... (resto del código)


app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    //const token = req.headers.authorization; // Obtener el token desde el encabezado

    // Validar si el usuario, la contraseña y el token están presentes
    if (username === 'sharonrudas' && password) {
        console.log('Password recibido:', password);
        //console.log('Token recibido:', token);
        console.log('Inicio de sesión exitoso para:', username);
        res.redirect(303,'/index.html');
        // Aquí deberías verificar el token usando jwt.verify()
        // Por ejemplo:
        // jwt.verify(token, 'secretkey', (err, decoded) => {
        //     if (err) {
        //         console.error('Error en la verificación del token:', err);
        //         res.status(401).json({
        //             auth: false,
        //             message: 'Token inválido o expirado'
        //         });
        //     } else {
        //         console.log('Token verificado con éxito');
        //         // Si el token es válido, redirigir al usuario a la página deseada
        //         res.redirect(303,'/index.html');
        //     }
        // });
    } else {
        res.status(401).json({
            auth: false,
            message: 'Credenciales incorrectas o password/token faltante'
        });
    }
});





// Authorization: Bearer <token>




function verifyToken(req, res, next){//
    //valida si el token es real o bama.. el heder llama a la palabra reservada a autorización
    const bearerHeader = req.headers['authorization'];//define una constante llamada bodyHeader
    if(typeof bearerHeader !== 'undefined'){// si esta definido ejecuta la sentencia. en caso de que no envia un status 440
        bearerToken = bearerHeader.split(" ")[1];//se ejecuta un split //psoisición 1 el token uwuw
        req.token = bearerToken;
        next();//se debe deponer next.. hace que regrese a continuar la ejecución de las demas sentencias
    }
    else{
        res.status(401);
        //res.sendFile(__dirname + '/public/error.html');
    }
}

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000,  http://localhost:3000/')
})