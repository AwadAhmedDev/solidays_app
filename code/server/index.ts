import Server from "./core/server";

const server = new Server().start();

const port = Number(process.env.PORT ?? 3001);
server.listen(port, () => console.log(`Solidays API sur le port ${port}`));
