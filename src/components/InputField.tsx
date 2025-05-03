import React from 'react';
import './styles.css';

const InputField = () => {
  return (
    <div>
      <form action="" className="input">
        <input type="input" placeholder="Enter a task!" className="input__box" />
        <button className="input_submit" type="submit">
          Go
        </button>
      </form>
    </div>
  );
};

export default InputField;
