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

    const submitHandler = e => {
        e.preventDefault();
        props.submit(props.member_id, props.field_id, name, val);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                {name && <input onChange={nameChangeHandler} type='text' value={name}/>}
                {val && <input onChange={valChangeHandler} type='text' value={val}/>}
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default Field;