import React, { useState, useEffect } from 'react';
import styles from './MemberEditor.module.css';
import Field from '../field/Field';

const MemberEditor = (props) => {
  const [member, setMember] = useState(props.member);
  const [update, setUpdate] = useState(0);
  const [fields, setFields] = useState(props.member ? [props.member.fields] : []);
  const [nodeName, setNodeName] = useState('');

  const onUpdate = () => {
    setUpdate(prevState => prevState + 1);
  }

  const onPlus = (e) => {
    e.preventDefault();
    setFields(prevState => [...prevState, { _id: '109324', name: 'New Field Name', value: 'New Field Value' }]);
  };

  const onDeleteNode = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/api/trees/${props.treeId}/members/${member._id}`, {
      method: 'DELETE', 
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    props.onUpdate()
    props.exitModal();
  };

  const onNodeName = e => {
    setNodeName(e.target.value);
  }

  const addTopLevelNode = async e => {
    e.preventDefault();
    await fetch(`http://localhost:8080/api/trees/${props.treeId}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: nodeName})
    })
    setNodeName('');
    props.onUpdate();
    props.exitModal();
  };

  const onAddChild = async (e) => {

    await fetch(`http://localhost:8080/api/trees/${props.treeId}/members/${member._id}/children`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: nodeName})
    });
    setNodeName('');
    props.onUpdate();
    props.exitModal();
  };

  const onAddParent = (e) => {

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
    if(member) void getData();
  }, [update])
  return (
    <div className={styles.modal}>
      {/* Content of the modal */}
      <div className={styles.modalContent}>
        <div>
          <h1 className={styles.x} onClick={props.onX}>X</h1>
        </div>
        <h1 className={styles.header}>Add / Delete Node</h1>
        <div className={styles.inputContainer}>
          <input type='text' value={nodeName} className={styles.nodeInput} placeholder='New Node Name' onChange={onNodeName}/>
        </div>
        <div className={styles.nodeButtonContainer}>
          <button disabled={!nodeName} className={styles.nodeButton} onClick={member ? onAddChild : addTopLevelNode}>Add child</button>
          <button className={styles.nodeButton} onClick={onDeleteNode}>Delete node</button>
          <button disabled={!nodeName} className={styles.nodeButton}>Add parent</button>
        </div>
        {/* The form for the new tree */}
        {member &&
        <form className={styles.form} onSubmit={onPlus}>
        <h1 className={styles.header}>Fields</h1>
          {fields.length !== 0 && fields.map(field => <Field onUpdate={onUpdate} member={member} fieldId={field._id} key={field._id} name={field.name} val={field.value} />)}
          <div className={styles.buttonContainer}>
            <button className={styles.fieldButton} type='submit'>+</button>
          </div>
        </form>}
      </div>
    </div>
  );
};

export default MemberEditor;
