import React, { useState } from 'react';

const Field = (props) => {

    const [name, setName] = useState(props.name.toString());
    const [val, setVal] = useState(props.val.toString());

    const valChangeHandler = (e) => {
        setVal(e.target.value);
    };

    const nameChangeHandler = (e) => {
        setName(e.target.value);
        console.log(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await fetch(`localhost:8080/api/members/${props._id}/fields`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, val: val})
        })
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <button type='submit'>Save</button>
                <div>
                    <input onChange={nameChangeHandler} type='text' value={name}/>
                    <input onChange={valChangeHandler} type='text' value={val}/>
                </div>
            </form>
        </div>
    )
}

export default Field;