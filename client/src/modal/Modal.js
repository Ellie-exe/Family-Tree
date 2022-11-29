import React, { useState } from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {

    /* State to keep track of the name of a new tree */
    const [treeName, setTreeName] = useState('');

    /**
     * To be called when the user changes the name of the new tree.
     *
     * This will result in the state keeping track of it to be updated.
     *
     * @param e the event object associated with the onChange DOM event.
     */
    const onChange = (e) => setTreeName(e.target.value);

    /**
     * To be called when the user submits a name for a new tree.
     *
     * This will result in a POST request to the database to insert
     * the newly created trees into the tree collection.
     *
     * @param e event object associated with the DOM onSubmit event.
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:8080/api/trees', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: treeName})
            });
            setTreeName('');
            props.onSubmit();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={styles.modal}>
            {/* Content of the modal */}
            <div className={styles.modalContent}>
                <h1 className={styles.x} onClick={props.onX}>X</h1>
                {/* The form for the new tree */}
                <form className={styles.form} onSubmit={onSubmit}>
                    <input onChange={onChange} className={styles.input} type='text' value={treeName}
                           placeholder='Tree name'/>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Modal;
