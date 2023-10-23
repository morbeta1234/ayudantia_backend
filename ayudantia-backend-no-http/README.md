Este repo contiene un ejemplo de servidor sin endpoints que se distribuye de la manera:
```
/src
    /controllers
        (Acá encontramos nuestras funciones asíncronas que realizan la lógica de nuestro servidor separadas en el tema que abarcan dentro de este.)
    /models
        (Acá podemos encontrar los modelos creados con Sequelize)
    /migrations
        (Acá podemos encontrar las migraciones creados con Sequelize)
    /config 
        (configuración de Sequelize)
    /seeders
        (Acá tenemos las seeds que nos permitirán poblar nuestra BDD con datos, con lo cuales podremos testear nuestro servidor)
    app.js
    index.js
    action.js (Este json sería una representación de un input)
.env (Se debe crear localmente con los datos encontrados abajo)
.sequelizerc
package.json
```
Template .env  
```
DB_USER = <completar>
DB_PASSWORD = <completar>
DB_NAME = <completar>
DB_HOST = <completar> (por lo general localhost si es local)
```

Teniendo postgres descargado y el usuario en postgres creado, se deben de correr los siguientes comandos:

1. ```yarn install```
2. ```yarn sequelize db:create```
3. ```yarn sequelize db:migrate```
4. ```yarn sequelize db:seed:all```

En caso de querer botar la base de datos, deberán usar ```yarn sequelize db:drop```.
PRECAUCIÓN: Solo usar en caso que nunca más se vayan a usar los datos de la BDD, ya que en caso contrario significará una pérdida de información permanente.
Una alternativa menos drástica es el revertir las migraciones, lo cual se puede lograr con yarn ```db:migrate:undo``` si queremos hacer undo de la último, o ```yarn db:migrate:undo:all``` si queremos revertir todos las migraciones.




Antes de iniciar el servidor, debemos actualizar el archivo ```action.json```, el cual indica la acción que se quiere realizar y los datos con los cuales se quiere que se trabaje en la sección de body. Este archivo busca simular el que busquemos trabajar con un endpoint (acción) y el JSON que se puede enviar en caso de los posts o params en el caso de los gets (sección body).


Con los 4 pasos previos, se puede iniciar el a correr el servidor con el siguiente comando:
```yarn start```

Con esto último, si realizamos todos los pasos previos correctamente, tendremos nuestro JSON con la response que se debería generar dependiendo de la acción que se quiere realizar y la data recibida. 
