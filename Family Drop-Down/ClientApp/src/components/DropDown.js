import React, { useState, useEffect } from 'react';

const DropDown = () => {

    const [people, setPeople] = useState([]);
    const familyTreeId = 1;

    useEffect(() => {
        fetch(`person/${familyTreeId}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setPeople(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, [])


    return (
        <main>
            {
                (people != null) ? people.map((person) => <h3 key={person.id}>{person.givenName}</h3>) : <div>Loading...</div>
            }
        </main>
    )
}

export default DropDown;
