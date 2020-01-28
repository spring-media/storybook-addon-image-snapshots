# Playground

## Usage

Install dependencies:
```sh
npm i
```

### For testing with a storybook server:

Start storybook:
```sh
npm run storybook
```

Start docker container:

```sh
docker run -p 9222:3000 -d --rm --name chrome browserless/chrome
```

Run the tests:
```sh
npm test
```

Stop docker container:
```sh
docker stop chrome
```

### For testing with a static build:

Build storybook:
```sh
npm run build-storybook
```

Start docker container:

```sh
docker run -p 9222:3000 -d --rm --name chrome -v $(pwd)/.storybook-static/:/opt/storybook-static browserless/chrome
```

Run the tests:
```sh
npm run test:static
```

Stop docker container:
```sh
docker stop chrome
```
