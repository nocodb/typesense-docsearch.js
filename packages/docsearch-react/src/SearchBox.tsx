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
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
            stroke="currentColor"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.0001 13.9996L11.1001 11.0996"
            stroke="currentColor"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

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
