import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Contact.module.css";

function ContactForm({onSubmit}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };


  const handleSubmit = event => {
    event.preventDefault();

    const options = { name, number };
    onSubmit(options);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

    return (
      <form className={styles.ContactEditor} onSubmit={handleSubmit}>
        <label className={styles.ContactEditor_label}>
          Name
          <input
            className={styles.ContactEditor_input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={styles.ContactEditor_label}>
          Number
          <input
            className={styles.ContactEditor_input}
            type="text"
            name="number"
            value={number}
            onChange={handleChange}
          />
        </label>
        <button className={styles.ContactEditor_button} type="submit">
          Add contact
        </button>
      </form>
    );

}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactForm