import React, { useState, useEffect } from 'react';
import styles from './MemberEditor.module.css';
import Field from '../field/Field';

const MemberEditor = (props) => {
  const [member, setMember] = useState(props.member);
  const [update, setUpdate] = useState(0);
  const [fields, setFields] = useState([props.member.fields]);

  const onUpdate = () => {
    setUpdate(prevState => prevState + 1);
  }

  const onPlus = (e) => {
    e.preventDefault();
    setFields(prevState =>[...prevState, { _id: '109324', name: 'New Field Name', value: 'New Field Value'}]);
  };

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(`http://localhost:8080/api/members/${props.member._id}/fields`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const obj = await resp.json();
      setFields(obj.fields);
    }
    void getData();
  },[update])
  return (
      <div className={styles.modal}>
        {/* Content of the modal */}
        <div className={styles.modalContent}>
          <div>
            <h1 className={styles.x} onClick={props.onX}>X</h1>
          </div>
          {/* The form for the new tree */}
          <form className={styles.form} onSubmit={onPlus}>
            {fields.length !== 0 && fields.map(field => <Field onUpdate={onUpdate} member={member} fieldId={field._id} key={field._id} name={field.name} val={field.value} />)}
            <div className={styles.buttonContainer}>
              <button className={styles.fieldButton} type='submit'>+</button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default MemberEditor;
