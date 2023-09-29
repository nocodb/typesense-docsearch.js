import type {
  AutocompleteApi,
  AutocompleteState,
} from '@algolia/autocomplete-core';
import type { MutableRefObject } from 'react';
import React from 'react';

import { MAX_QUERY_SIZE } from './constants';
import type { InternalDocSearchHit } from './types';

export type SearchBoxTranslations = Partial<{
  resetButtonTitle: string;
  resetButtonAriaLabel: string;
  cancelButtonText: string;
  cancelButtonAriaLabel: string;
}>;

interface SearchBoxProps
  extends AutocompleteApi<
    InternalDocSearchHit,
    React.FormEvent,
    React.MouseEvent,
    React.KeyboardEvent
  > {
  state: AutocompleteState<InternalDocSearchHit>;
  autoFocus: boolean;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  onClose: () => void;
  isFromSelection: boolean;
  translations?: SearchBoxTranslations;
}

export function SearchBox({ ...props }: SearchBoxProps) {
  const { onReset } = props.getFormProps({
    inputElement: props.inputRef.current,
  });

  React.useEffect(() => {
    if (props.autoFocus && props.inputRef.current) {
      props.inputRef.current.focus();
    }
  }, [props.autoFocus, props.inputRef]);

  React.useEffect(() => {
    if (props.isFromSelection && props.inputRef.current) {
      props.inputRef.current.select();
    }
  }, [props.isFromSelection, props.inputRef]);

  return (
    <>
      <form
        className="DocSearch-Form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
        onReset={onReset}
      >
        <input
          className="DocSearch-Input"
          ref={props.inputRef}
          {...props.getInputProps({
            inputElement: props.inputRef.current!,
            autoFocus: props.autoFocus,
            maxLength: MAX_QUERY_SIZE,
          })}
        />
      </form>
    </>
  );
}
