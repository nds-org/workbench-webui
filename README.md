# Labs Workbench WebUI 2.x

Running instances of etcd + apiserver are required.

## Kubernetes

Prerequisites:
* Kubernetes Cluster
* Helm

### Install via Helm Chart

```bash
cd ~
git clone https://github.com/nds-org/workbench-helm-chart && cd workbench-helm-chart
helm upgrade --install workbench . -f values.yaml
```

## Docker Compose (Development Only)

Prerequisites:
* Docker for Mac / Docker for Windows
* Kubernetes in Docker


### Production Mode

Start up the backend + build/start the webui in production mode:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

### Development Mode

[WIP] Start up the backend + build/start the webui in development mode:
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

* NOTE: File watching is currently broken in dev mode, so the code **does not** automatically recompile properly

### Backend Only

To use an external IDE, you can start up only the backend services:
```bash
docker-compose -f docker-compose.yml up -d
```


## Local Development

Prerequisites:
* `node` + `npm` [+ `npx`]
* `yarn`

Run `yarn install` to fetch project dependencies. This is required for building the source.

In the project directory, you can run:

### `yarn swagger`

Regenerate the swagger REST API client from the spec(s) in `public/swagger*.yml`.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.
