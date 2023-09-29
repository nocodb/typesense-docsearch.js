import type {
  AutocompleteState,
  AutocompleteOptions,
} from '@algolia/autocomplete-core';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { SearchClient } from 'typesense';
import type { ConfigurationOptions as TypesenseConfigurationOptions } from 'typesense/lib/Typesense/Configuration';
import type { SearchParams as TypesenseSearchParams } from 'typesense/lib/Typesense/Documents';

import { DocSearchModal } from './DocSearchModal';
import type {
  DocSearchHit,
  InternalDocSearchHit,
  StoredDocSearchHit,
} from './types';

import type { ModalTranslations } from '.';

export type DocSearchTranslations = Partial<{
  modal: ModalTranslations;
}>;

export interface DocSearchProps {
  typesenseCollectionName: string;
  typesenseServerConfig: TypesenseConfigurationOptions;
  typesenseSearchParameters: TypesenseSearchParams;
  placeholder?: string;
  transformItems?: (items: DocSearchHit[]) => DocSearchHit[];
  hitComponent?: (props: {
    hit: InternalDocSearchHit | StoredDocSearchHit;
    children: React.ReactNode;
  }) => JSX.Element;
  resultsFooterComponent?: (props: {
    state: AutocompleteState<InternalDocSearchHit>;
  }) => JSX.Element | null;
  transformSearchClient?: (searchClient: SearchClient) => SearchClient;
  disableUserPersonalization?: boolean;
  initialQuery?: string;
  navigator?: AutocompleteOptions<InternalDocSearchHit>['navigator'];
  translations?: DocSearchTranslations;
  getMissingResultsUrl?: ({ query }: { query: string }) => string;
}

export function DocSearch(props: DocSearchProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      } else if (
        event.key.toLowerCase() === 'j' &&
        (event.metaKey || event.ctrlKey) &&
        !isOpen
      ) {
        event.preventDefault();
        onOpen();
      } else if (
        event.key.toLocaleLowerCase() === 'k' &&
        (event.metaKey || event.ctrlKey) &&
        isOpen
      ) {
        event.preventDefault();
        onClose();
      } else if (
        event.key.toLocaleLowerCase() === 'l' &&
        (event.metaKey || event.ctrlKey) &&
        isOpen
      ) {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [isOpen, onClose, onOpen]);

  return (
    <>
      {isOpen &&
        createPortal(
          <DocSearchModal
            {...props}
            initialScrollY={window.scrollY}
            placeholder="Search through our docs"
            initialQuery={props.initialQuery}
            translations={props?.translations?.modal}
            onClose={onClose}
          />,
          document.body
        )}
    </>
  );
}
