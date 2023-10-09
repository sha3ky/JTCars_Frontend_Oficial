Conseguido hacer que funcione el front-end con el back-end a través de ngrok ( version free ) en mi localhost.

La versión free solo permite 2h de tunel ( aunque a mi me haya ido un poco más ) luego cambia de url ( la aplicacion sique en la misma solo el backend ).

En caso de que no funcione avisadme y cambio la url y se vuelve a tener las 2 - 3h de tunel que hace enlace de la web con mi base de datos del localhost para testear.

Solo se ha podio hacer que funcione en edge y en firefox instalando alterando los cors ya que ngrok la versión free viene capada ( aunque en mi localhost los cors están desactivados, no he podido conectarme sin las extensiones )

En Firefox instalando :

--CORS Everywhere y activandolo (con activar es suficiente).

En Edge instalamos Cross domain y añadiendo la url a la que se quiera acceder (prefiero Mozilla).

# Quasar App (quasar-project)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
