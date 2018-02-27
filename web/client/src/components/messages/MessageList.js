import React from 'react';
import Radium from 'radium';
import Message from './Message';

const styles = {
  list: {
    margin: '4px',
    padding: '5px',
    marginTop: 0,
    flex: '1 1 auto',
    order: 1,
    maxWidth: '80%',
    height: 270,
  },
};

export default Radium((props) => {
  const { messages } = props;
  let messageUi = null;

  if (messages.size > 0) {
    messageUi = props.messages.map((message) => {
      let name = null;
      if (message.get('user')) {
        name = message.get('user').get('name');
      }

      return (
        <Message
          key={message.get('id')}
          name={name}
          createdAt={message.get('createdAt')}
          message={message.get('message')}
        />
      );
    });
  }

  return (
    <div style={styles.list}>
      {messageUi}
    </div>
  );
});
