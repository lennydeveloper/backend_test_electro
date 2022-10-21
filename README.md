# Prueba de selección Electronika

Este repositorio tiene como objetivo principal desarrollar una REST API para consumir los servicios de Unsplash

*NOTA: La app no ha sido verificada dentro de los parámetros de Unsplash, por lo tanto las peticiones están limitadas a 50 requests por hora*

### VARIABLES DE ENTORNO

Las variables de entorno utilizadas en este proyecto se encontrarán en el archivo .env ubicado en la raíz del proyecto

### INICIALIZAR EL PROYECTO

```node
npm install
npm start
```

### REQUISITOS PREVIOS
* Node.js
* npm

### EJECUTAR TESTS UNITARIOS
```bash
npm start
NODE_OPTIONS=--experimental-vm-modules npx jest
```

![NODE TESTING](https://user-images.githubusercontent.com/90154644/197113891-f8931175-83f6-4b21-ac68-7a14459481a1.png)

### DOCUMENTACIÓN

La documentación de los endpoints se puede encontrar en el siguiente enlace
[POSTMAN DOCS](https://documenter.getpostman.com/view/16939864/2s84Dizkc7)