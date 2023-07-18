import { Avatar } from 'rsuite';
import { getNameInitials } from '../../logic/helper';

export const AvatarIcon = ({ name, ...props }) => {
  return (
    <Avatar {...props} circle>
      {getNameInitials(name)}
    </Avatar>
  );
};
