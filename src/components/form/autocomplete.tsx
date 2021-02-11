// libs
import { useState, useCallback, memo } from 'react';
import Autosuggest from 'react-autosuggest';

// http
import { getSuggestions } from '../../model/api';

// styles
import './form.css';

// types
import type { User } from '../../model/types';

// Copy pasted from https://github.com/chodorowicz/ts-debounce
/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: never[]) => void;
export type Options = {
  isImmediate: boolean;
};
export interface DebouncedFunction<F extends Procedure> {
  cancel: () => void;
  (this: ThisParameterType<F>, ...args: Parameters<F>): void;
}
export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false,
  },
): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const debouncedFunction = function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const doLater = function (): void {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };
    const shouldCallNow = options.isImmediate && timeoutId === undefined;
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(doLater, waitMilliseconds);
    if (shouldCallNow) {
      func.apply(context, args);
    }
  };
  debouncedFunction.cancel = function () {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  };
  return debouncedFunction;
}

const deb = debounce(async ({ value, setSuggestions }) => {
  const result = await getSuggestions({ data: value });
  // @ts-ignore
  setSuggestions(result);
}, 250);

export const Autocomplete = memo(({ onChange }: { readonly onChange: (user: User) => void }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentSuggestion, setCurrentSuggestion] = useState('');

  const onSuggestionsFetchRequested = useCallback(
    ({ value }) => {
      // @ts-ignore
      deb({ value, setSuggestions });
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
