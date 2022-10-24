import React from 'react';

const Feed = () => {
    const [user, setUser] = React.useState(null);
    const [tree, setTree] = React.useState(null);

    const email = 'someone@gmail.com';
    const trees = [];

    React.useEffect(() => {
        fetch(`/api/users/${email}`)
            .then((res) => res.json())
            .then((data) => setUser(data.message));
    }, []);

    for (const treeID of user.trees) {
        React.useEffect(() => {
            fetch(`/api/trees/${treeID}`)
                .then((res) => res.json())
                .then((data) => setTree(data.message));
        }, []);

        trees.push(tree);
    }

    return (<h1>Feed</h1>)
};

export default Feed;
