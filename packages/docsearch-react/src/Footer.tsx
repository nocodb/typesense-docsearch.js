import React from 'react';

export type FooterTranslations = Partial<{
  selectText: string;
  selectKeyAriaLabel: string;
  navigateText: string;
  navigateUpKeyAriaLabel: string;
  navigateDownKeyAriaLabel: string;
  closeText: string;
  closeKeyAriaLabel: string;
  searchByText: string;
}>;

const isMac = () => {
  return (
    typeof window !== 'undefined' && window.navigator?.platform?.includes('Mac')
  );
};

const renderCmdOrCtrlKey = () => {
  return isMac() ? '⌘' : 'Ctrl';
};

export function Footer() {
  function setActiveCmdView(cmdKey: 'K' | 'L') {
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: cmdKey,
        ctrlKey: !isMac() || undefined,
        metaKey: isMac() || undefined,
        bubbles: true, // Ensure the event bubbles.
        cancelable: true, // Allow the event to be cancellable.
      })
    );
  }

  return (
    <div className="doc-container">
      <div className="doc-footer-item doc-shortcut-active">
        <svg
          className="doc-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M7.5 14.6667L3.99999 14.6667C3.64637 14.6667 3.30723 14.5262 3.05718 14.2762C2.80713 14.0261 2.66666 13.687 2.66666 13.3334V2.66671C2.66666 2.31309 2.80713 1.97395 3.05718 1.7239C3.30723 1.47385 3.64637 1.33337 3.99999 1.33337H8.66666L13.3333 6.00004V8.5"
            stroke="#3366ff"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.66666 1.33337V6.00004H13.3333"
            stroke="#3366ff"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.5 14C11.8807 14 13 12.8807 13 11.5C13 10.1193 11.8807 9 10.5 9C9.11929 9 8 10.1193 8 11.5C8 12.8807 9.11929 14 10.5 14Z"
            stroke="#3366ff"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.5286 15.4714C13.7889 15.7318 14.2111 15.7318 14.4714 15.4714C14.7318 15.2111 14.7318 14.7889 14.4714 14.5286L13.5286 15.4714ZM13.4714 13.5286L13 13.0572L12.0572 14L12.5286 14.4714L13.4714 13.5286ZM14.4714 14.5286L13.4714 13.5286L12.5286 14.4714L13.5286 15.4714L14.4714 14.5286Z"
            fill="#3366ff"
          />
        </svg>
        Document
        <span className="doc-shortcut doc-icon-active">
          {renderCmdOrCtrlKey()} + J
        </span>
      </div>
      <div className="doc-footer-item">
        <svg
          className="doc-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10 9.33335L13.3333 6.00002L10 2.66669"
            stroke="#65696f"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.66669 13.3333V8.66667C2.66669 7.95942 2.94764 7.28115 3.44774 6.78105C3.94783 6.28095 4.62611 6 5.33335 6H13.3334"
            stroke="#65696f"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Quick Navigation
        <span className="doc-shortcut">{renderCmdOrCtrlKey()} + K</span>
      </div>
      <div className="doc-footer-item" onClick={() => setActiveCmdView('L')}>
        <svg
          className="doc-icon"
          viewBox="0 0 24 24"
          width="1.2em"
          height="1.2em"
        >
          <path
            fill="#65696f"
            d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z"
          ></path>
        </svg>
        Recent
        <span className="doc-shortcut">{renderCmdOrCtrlKey()} + L</span>
      </div>
    </div>
  );
}
