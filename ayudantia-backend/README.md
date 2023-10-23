Este repo contiene un ejemplo de servidor que se distribuye de la manera:

/src
>>    /routes
>>>        (acá se realiza la creación de los endpoints y conexión con las funciones asíncronas de nuestros controladores)
>>    /controllers
>>        (Acá encontramos nuestras funciones asíncronas que realizan la lógica de nuestro servidor separadas en el tema que abarcan dentro de este.)
    /models
        (Acá podemos encontrar los modelos creados con Sequelize)
    /migrations
        (Acá podemos encontrar las migraciones creados con Sequelize)
    /config 
        (configuración de Sequelize)
    /seeders
        (Acá tenemos las seeds que nos permitirán poblar nuestra BDD con datos, con lo cuales podremos testear nuestro servidor)
    app.js
    routes.js (Se realiza el ruteo principal de los endpoints)
    index.js
.env (Se debe crear localmente con los datos encontrados abajo)
.sequelizerc
package.json

Template .env

DB_USER = <completar>
DB_PASSWORD = <completar>
DB_NAME = <completar>
DB_HOST = <completar> (por lo general localhost si es local)


Teniendo postgres descargado y el usuario en postgres creado, se deben de correr los siguientes comandos:

1. yarn install
2. yarn sequelize db:create
3. yarn sequelize db:migrate
4. yarn sequelize db:seed:all

En caso de querer botar la base de datos, deberán usar yarn sequelize db:drop 
PRECAUCIÓN: Solo usar en caso que nunca más se vayan a usar los datos de la BDD, ya que en caso contrario significará una pérdida de información permanente.

Con los 4 pasos previos, se puede iniciar el a correr el servidor con el siguiente comando:
yarn dev

Con esto último, si realizamos todos los pasos previos correctamente, tendremos nuestro servidor con sus endpoints funcionando
