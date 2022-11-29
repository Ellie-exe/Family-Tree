import React, { useState } from 'react';
import styles from './Field.module.css';

const Field = (props) => {

    const [name, setName] = useState(props.name);
    const [val, setVal] = useState(props.val);
    const [newField, setNewField] = useState(props.name === 'New Field Name' && props.val === 'New Field Value');

    const valChangeHandler = (e) => {
        if (e.target.value === '')
            setVal(' ');
        else {
            setVal(e.target.value);
        }
    };

    const nameChangeHandler = (e) => {
        if (e.target.value === '')
            setName(' ');
        else {
            setName(e.target.value);
        }
    };

    const addField = async (e) => {
        e.preventDefault();
        const memberId = props.member._id;
        console.log(memberId);
        await fetch(`http://localhost:8080/api/members/${memberId}/fields`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }, body: JSON.stringify({name: name, value: val})
        });
        props.onUpdate();
    };

    const updateField = async (e) => {
        e.preventDefault();
        const memberId = props.member._id;
        await fetch(`http://localhost:8080/api/members/${memberId}/fields/${props.fieldId.toString()}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }, body: JSON.stringify({name: name, value: val})
        });
        props.onUpdate();
    };

    const deleteField = async (e) => {
        e.preventDefault();
        const memberId = props.member._id;
        await fetch(`http://localhost:8080/api/members/${memberId}/fields/${props.fieldId.toString()}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        props.onUpdate();
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                {name && <input className={styles.input} onChange={nameChangeHandler} type='text' value={name}
                                placeholder='New Field Name'/>}
                {val && <input className={styles.input} onChange={valChangeHandler} type='text' value={val}
                               placeholder='New Field Value'/>}
                <button onClick={newField === true ? addField : updateField} className={styles.button} disabled={props.name === name && props.val === val} type='submit'>Save</button>
                <button onClick={deleteField} className={`${styles.button} ${styles.delete}`} type='submit'>Delete
                </button>
            </div>
        </div>
    );
};

export default Field;
