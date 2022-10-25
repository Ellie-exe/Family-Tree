import React, { useState } from 'react';
import styles from './Field.module.css';

const Field = (props) => {

    const [name, setName] = useState(props.name);
    const [val, setVal] = useState(props.val);

    const valChangeHandler = (e) => {
        if (e.target.value === '')
            setVal(' ');
        else
            setVal(e.target.value);
    };

    const nameChangeHandler = (e) => {
        if (e.target.value === '')
            setName(' ');
        else
            setName(e.target.value);
    };

    const addField = async (e) => {
        console.log('Field before')
        e.preventDefault();
        console.log('Field after')
        const memberId = props.member._id;
        await fetch(`http://localhost:8080/api/members/${memberId}/fields`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ name: name, value: val })
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                {name && <input className={styles.input} onChange={nameChangeHandler} type='text' value={name} placeholder='New Field Name' />}
                {val && <input className={styles.input} onChange={valChangeHandler} type='text' value={val} placeholder='New Field Value' />}
                <button onClick={addField} className={styles.button} type='submit'>Save</button>
            </div>
        </div>
    );
};

export default Field;