import React, { useRef, useState, useCallback } from 'react';
import { map } from 'lodash/fp';
import { arrayOf, string, func } from 'prop-types';

import s from './index.css';

const Autocomplete = ({
  dataSource,
  onFocus,
  onChange,
  onSelect,
}) => {
  const inputRef = useRef(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const _onFocus = useCallback(() => {
    setShowDropDown(true);
		onFocus();
  }, [onFocus]);
  const _onChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [onChange]);
  const _onSelect = useCallback(text => () => {
    setInputValue(text);
    setShowDropDown(false);
  }, [onSelect]);

  return (
    <div className={s.Container}>
      <input
        type="text"
        ref={inputRef}
        onFocus={_onFocus}
        onChange={_onChange}
        value={inputValue}
      />
      <div className={s.DropDown} style={{ display: showDropDown ? 'block' : 'none' }}>
        {map(text => (
          <div onClick={_onSelect(text)}>
            {text}
          </div>
        ))(dataSource)}
      </div>
    </div>
  );
};

Autocomplete.propTypes = {
  dataSource: arrayOf(string),
	onFocus: func,
	onChange: func,
	onSelect: func,
};

Autocomplete.defaultProps = {
  dataSource: [],
	onFocus: () => {},
	onChange: () => {},
	onSelect: () => {},
};

export default Autocomplete;
