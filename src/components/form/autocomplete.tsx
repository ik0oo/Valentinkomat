// libs
import { useState, useCallback, memo } from 'react';
import Autosuggest from 'react-autosuggest';

// http
import { getSuggestions } from '../../model/api';

// styles
import './form.css';

// types
import type { User } from '../../model/types';

export const Autocomplete = memo(({ onChange }: { readonly onChange: (user: User) => void }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentSuggestion, setCurrentSuggestion] = useState('');

  // @ts-ignore
  const onSuggestionsFetchRequested = useCallback(
    async ({ value }: { readonly value: string }) => {
      const result = await getSuggestions({ data: value });
      // @ts-ignore
      setSuggestions(result);
    },
    [setSuggestions],
  );

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([]);
  }, [setSuggestions]);

  const onChangeCurrentSuggestion = useCallback(
    (event: React.FormEvent<any>, props) => {
      const { newValue } = props;

      setCurrentSuggestion(newValue);
    },
    [setCurrentSuggestion],
  );

  const inputProps = {
    placeholder: 'Input name',
    value: currentSuggestion,
    onChange: onChangeCurrentSuggestion,
  };

  // @ts-ignore
  const getSuggestionValue = (suggestion) => {
    onChange(suggestion);
    return suggestion.name;
  };
  // @ts-ignore
  const renderSuggestion = (suggestion) => {
    const { avatar, email, name } = suggestion as User;

    return (
      <>
        <img src={avatar} alt="avatar" width="96" height="96" />
        <div>
          <div>{name}</div>
          <div>({email})</div>
        </div>
      </>
    );
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
});
