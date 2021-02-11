// libs
import { useMemo, useState, useCallback, memo, SyntheticEvent } from 'react';
import styled from 'styled-components';

// constants
import { TEXT_AREA_MAX_LEN } from '../../constants';

// components
import { Autocomplete } from './autocomplete';

// styles
import './form.css';

// types
import type { User } from '../../model/types';

const TextArea = styled.textarea<{ readonly hasError: boolean }>`
  width: 100%;
  height: 339px;
  margin-bottom: 15px;
  padding: 24px 32px;
  background: #ffffff;
  border: 1px solid ${({ hasError }) => (hasError ? '#CA0000' : '#000000')};
  box-sizing: border-box;
  border-radius: 6px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.2;
  color: #6f6f6f;
  outline: none;
  resize: none;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-self: center;

  @media (min-width: 780px) {
    width: 428px;
  }
`;

const FormControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  label {
    cursor: pointer;
  }
`;

const IsAnonymous = styled.input`
  width: 34px;
  height: 34px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 76.7%;
  color: #6f6f6f;
`;

const MessageLength = styled.div<{ readonly hasError: boolean }>`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 76.7%;
  text-align: center;
  color: ${({ hasError }) => (hasError ? '#CA0000' : '#000000')};
`;

export const Form = memo(
  ({
    onChangeLength,
    onSubmit,
    hasError,
  }: {
    readonly onChangeLength: (length: number) => void;
    readonly hasError: boolean;
    readonly onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
  }) => {
    const [textLength, setTextLength] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const onChangeText = useCallback(
      (e) => {
        const text = e.target.value;
        const length = text.length;

        onChangeLength(length);
        setTextLength(length);
      },
      [onChangeLength, setTextLength],
    );
    const onChangeAutocomplete = useCallback(
      (user: User) => {
        setUser(user);
      },
      [setUser],
    );
    const userId = useMemo(() => (user ? user.id : ''), [user]);
    const userName = useMemo(() => (user ? user.name : ''), [user]);

    return (
      <FormWrapper onSubmit={onSubmit} id="editor-form">
        <Autocomplete onChange={onChangeAutocomplete} />
        <TextArea
          maxLength={TEXT_AREA_MAX_LEN}
          id="text"
          hasError={hasError}
          onChange={onChangeText}
          placeholder="Leave a message here"
        />
        <input type="hidden" id="userId" value={userId} />
        <input type="hidden" id="userName" value={userName} />
        <FormControls>
          <label htmlFor="isAnonymous">
            <IsAnonymous type="checkbox" name="isAnonymous" id="isAnonymous" />
            Anonymously
          </label>
          <MessageLength hasError={hasError}>
            {textLength}/{TEXT_AREA_MAX_LEN}
          </MessageLength>
        </FormControls>
      </FormWrapper>
    );
  },
);
