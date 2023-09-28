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
  return isMac() ? '⌘' : 'CTRL';
};

export function Footer() {
  return (
    <div className="container">
      <div className="item">
        <svg className="icon" viewBox="0 0 24 24" width="1.2em" height="1.2em">
          <path
            fill="currentColor"
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11Z"
          ></path>
        </svg>
        Document
        <span className="shortcut active">{renderCmdOrCtrlKey()} J</span>
      </div>
      <div className="item">
        <svg className="icon" viewBox="0 0 24 24" width="1.2em" height="1.2em">
          <path
            fill="currentColor"
            d="M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7m0 2a5 5 0 0 0-5 5c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 0 0-5-5Z"
          ></path>
        </svg>
        Quick Navigation
        <span className="shortcut">{renderCmdOrCtrlKey()} K</span>
      </div>
      <div className="item">
        <svg className="icon" viewBox="0 0 24 24" width="1.2em" height="1.2em">
          <path
            fill="currentColor"
            d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z"
          ></path>
        </svg>
        Recent
        <span className="shortcut">{renderCmdOrCtrlKey()} L</span>
      </div>
    </div>
  );
}
