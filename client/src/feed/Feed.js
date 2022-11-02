import React from 'react';
import {useState, useEffect} from "react";
import styles from './Feed.module.css';
import { useHistory } from 'react-router-dom';

const Feed = () => {
    const [trees, setTrees] = useState([]);
    const history = useHistory();

    const redirectToEditor = () => {
      history.push('/editor');
    };

    useEffect(() => {
        const getData = async () => {
            /* need to get actual route */
            // try {
            //     const data = await fetch('http://localhost')
            //     setTrees(data.trees);
            // } catch (err) {
            //     console.log(err);
            // }
            setTrees([{name: 'Tree 1', numOccupants: 5}, {name: 'Tree 2', numOccupants: 8}]); // placeholder
        };
        getData();
    }, [])
    return (
        <div className={styles.container}>
            <div>
                {trees.length !== 0 && trees.map(tree => {
                    return (
                        <div onClick={redirectToEditor}>
                            <h1>{tree.name}</h1>
                            <h1>{tree.numOccupants}</h1>
                        </div>
                    )
                })}
                <span>&#43;</span>
            </div>
        </div>
    )
};
export default Feed;