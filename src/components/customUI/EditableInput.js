import { useState } from 'react';
import { InputGroup } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import EditIcon from '@rsuite/icons/Edit';

export const EditableInput = ({ initVal, onSave, ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputVal, setInputVal] = useState(initVal);

  const onInputChange = evt => {
    setInputVal(evt.target.value);
  };

  const onCheckIconClicked = () => {
    //console.log('On check icon clicked clicked ');
    onSave(inputVal);
    setIsEditing(false);
  };

  const onEditClicked = () => {
    console.log('On edit clicked ');
    setIsEditing(true);
  };

  return (
    <div>
      <h4>
        <label>Nick Name</label>
      </h4>
      <InputGroup>
        <input
          {...props}
          value={inputVal}
          disabled={!isEditing}
          onChange={onInputChange}
          className="w100"
        />
        {isEditing ? (
          <InputGroup.Button>
            <CheckIcon onClick={onCheckIconClicked} />
          </InputGroup.Button>
        ) : (
          <InputGroup.Button>
            <EditIcon onClick={onEditClicked} />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};
