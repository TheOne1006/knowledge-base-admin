# knowledge-base-admin

## Installation

Install the application dependencies by running:

```sh
npm install
# or
yarn install
```

## Development

Start the application in development mode by running:

```sh
npm run dev
# or
yarn dev
```

## Production

Build the application in production mode by running:

```sh
npm run build
# or
yarn build
```

## DataProvider

The included data provider use [FakeREST](https://github.com/marmelab/fakerest) to simulate a backend.
You'll find a `data.json` file in the `src` directory that includes some fake data for testing purposes.

It includes two resources, posts and comments.
Posts have the following properties: `id`, `title` and `content`.
Comments have the following properties: `id`, `post_id` and `content`.



## log


http://localhost:3000/v1/kbs/1/privewFile?filePath=%2Ftitle%2Fcli%2Flibraries.html&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0aGVvbmUiLCJlbWFpbCI6IjI5QHFxLmNvbSIsInJvbGVzIjpbImF1dGhlbnRpY2F0ZWQiLCJ1c2VyIiwic3VwZXItYWRtaW4iXSwic2FsdCI6ImZmN2EzNmNkIiwicGFzc3dvcmQiOiJlN2U5ZjAzZGNlZTU3OTRkMmUyMGE2ZjhmYjNiNGRkMyIsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMjJUMDc6MTE6MDIuMTY5WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDEtMjJUMDc6MTE6MDIuMTY5WiIsInZlcnNpb24iOjAsImlzRGVsZXRlZCI6ZmFsc2UsImlhdCI6MTcwNjAwMDkxMSwiZXhwIjoxNzA2ODY0OTExfQ.Vsd7YnDK17UbuwhYoPr6x766bh3boF38PG6rR1dD2Jk


http://localhost:3000/v1/kbs/1/privewFile?filePath=%2Ftitle%2Fcli%2Flibraries.html&token=_mock1,super-admin
