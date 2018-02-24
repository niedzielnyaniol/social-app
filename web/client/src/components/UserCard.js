import React from 'react';
import styled from 'styled-components';

import UserShape from '../shapes/user';

const Container = styled.div`
  display: flex;
`;

const AvatarWrapper = styled.div`
  margin-right: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.div`
  font-weight: 700;
`;

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserCard = ({
  user,
}) => (
  <Container>
    <AvatarWrapper>
      <AvatarImg src={user.avatar} alt="avatar" />
    </AvatarWrapper>
    <TextWrapper>
      <Text>{user.name}</Text>
      <Text>{user.surname}</Text>
    </TextWrapper>
  </Container>
);

UserCard.propTypes = {
  user: UserShape.isRequired,
};

export default UserCard;
