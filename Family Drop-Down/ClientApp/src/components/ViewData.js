import React, { useState, useEffect } from 'react';

const ViewData = () => {

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
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Birth Date</th>
                    <th>Birth Location</th>
                    <th>Death Date</th>
                    <th>Death Location</th>

                </tr>
            </thead>
            <tbody>
                {people.map(person =>
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.givenName}</td>
                        <td>{person.surname}</td>
                        <td>{person.gender}</td>
                        <td>{person.birthDate}</td>
                        <td>{person.birthLocation}</td>
                        <td>{person.deathDate}</td>
                        <td>{person.deathLocation}</td>

                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default ViewData;