import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  return (
    error && (
      <div className="alert alert-danger m-2">
        Please fix the following errors: 
        <ul className="mt-3">{error.message.split(",").map((message) => <li key={message}>{message}</li>)}</ul>
      </div>
    )
  );
}

export default ErrorAlert;
