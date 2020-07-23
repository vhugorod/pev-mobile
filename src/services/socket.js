import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.7:3333', {
  autoConnect: false,
});

function subscribeToNewCompanies(subscribeFunction) {
  socket.on('new-company', subscribeFunction);
}

function connect(latitude, longitude, materials) {
  socket.io.opts.query = {
    latitude,
    longitude,
    materials,
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewCompanies,
};
