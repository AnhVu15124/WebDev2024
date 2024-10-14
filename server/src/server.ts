import http from "http";
import app from "./index";
import {Server} from "socket.io";
import jwt, {VerifyErrors} from "jsonwebtoken";
import documentService from "./services/document.service";
import SocketEvent from "./types/enums/socket-events-enum";

const port = 8080;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
})

io.on("connection", (socket) => {
  const accessToken = socket.handshake.query.accessToken as string | undefined;
  const documentID = socket.handshake.query.documentID as string | undefined;

  if (!accessToken || !documentID) return socket.disconnect();
  else {
    jwt.verify(
      accessToken,
      "access_token",
      (err: VerifyErrors | null, decoded: unknown) => {
        const { id, email } = decoded as RequestUser;
        (socket as any).username = email;

        documentService
          .findDocumentById(parseInt(documentID), parseInt(id))
          .then(async (document) => {
            if (document === null) return socket.disconnect();

            socket.join(documentID);

            io.in(documentID)
              .fetchSockets()
              .then((clients) => {
                io.sockets.in(documentID).emit(
                  SocketEvent.CURRENT_USERS_UPDATE,
                  clients.map((client) => (client as any).username)
                );
              });

            socket.on(SocketEvent.SEND_CHANGES, (rawDraftContentState) => {
              socket.broadcast
                .to(documentID)
                .emit(SocketEvent.RECEIVE_CHANGES, rawDraftContentState);
            });

            socket.on("disconnect", async () => {
              socket.leave(documentID);
              socket.disconnect();
              io.in(documentID)
                .fetchSockets()
                .then((clients) => {
                  io.sockets.in(documentID).emit(
                    SocketEvent.CURRENT_USERS_UPDATE,
                    clients.map((client) => (client as any).username)
                  );
                });
            });
          })
          .catch((error) => {
            console.log(error);
            return socket.disconnect();
          });
      }
    );
  }
});