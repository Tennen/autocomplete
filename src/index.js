import React, { useRef, useState, useCallback } from 'react';
import { map } from 'lodash/fp';
import { arrayOf, string, func } from 'prop-types';

const Autocomplete = ({
  dataSource,
  onChange,
  onFocus,
  onSelect,
}) => {
  const inputRef = useRef(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const _onInput = useCallback(() => {
    setShowDropDown(true);
  });
  const _onChange = useCallback((e) => {
    const targetValue = e.target.value;
    setInputValue(targetValue);
    onChange(targetValue);
  }, [onChange]);
  const _onSelect = useCallback(text => () => {
    setInputValue(text);
    setShowDropDown(false);
  }, [onSelect]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        ref={inputRef}
        onInput={_onInput}
        onFocus={onFocus}
        onChange={_onChange}
        value={inputValue}
      />
      <div
        style={{
          position: 'absolute',
          top: 10,
          display: showDropDown ? 'block' : 'none',
        }}
      >
        {map(text => (
          <div onClick={_onSelect(text)} role="button" tabIndex={0}>
            {text}
          </div>
        ))(dataSource)}
      </div>
    </span>
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
