import React, { useState, useEffect } from 'react';
import styles from './MemberEditor.module.css';
import Field from '../field/Field';

const MemberEditor = (props) => {
  const [member, setMember] = useState(props.member);
  const [update, setUpdate] = useState(0);
  const [fields, setFields] = useState([]);

  const onSubmit = (e) => { 
    console.log('Member before')
    e.preventDefault();
    console.log('Member after')
    setFields(prevState =>[...prevState, { _id: '109324', name: 'New Field Name', value: 'New Field Value'}]);
  };


  useEffect(() => {
    setFields(member.fields);
  }, [update])
  return (
    <div className={styles.modal}>
      {/* Content of the modal */}
      <div className={styles.modalContent}>
        <div className={styles.xContainer}>
          <h1 className={styles.x} onClick={props.onX}>X</h1>
        </div>
        {/* The form for the new tree */}
        <form className={styles.form} onSubmit={onSubmit}>
          {member && fields && fields.map(field => <Field member={member} key={field._id} name={field.name} val={field.value} />)}
          <div className={styles.buttonContainer}>
            <button className={styles.fieldButton} type='submit'>+</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberEditor;