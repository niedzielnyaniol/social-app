import io from 'socket.io-client';
import { messageTypes, uri } from '../modules/reducers/config';

const socket = io(uri);

const init = (store) => {
  // subksrybcja wiadomości wysłanej z serwera
  Object.keys(messageTypes)
    .forEach((type) => socket.on(type, (payload) => store.dispatch({ type, payload })));
};

// funkcja wysyłająca zdarzenie z wiadomością
const emit = (type, payload) => socket.emit(type, payload);

export {
  init,
  emit,
};
