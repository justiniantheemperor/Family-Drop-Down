import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';


const ViewData = () => {

    const [people, setPeople] = useState([]);
    const [familyTreeId, setFamilyTreeId] = useState(1);

    const fetchData = async () => {
        try {
            const response = await fetch(`person/${familyTreeId}`);
            const data = await response.json();
            setPeople(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData(); // Load data on component mount
    }, [familyTreeId]);


    const handleFamilyTreeId = (newId) => {
        // Change familyTreeId to 2 when the button is clicked
        setFamilyTreeId(newId);
        fetchData();
    };


    return (
        <div>
            <div>
                <Button
                    variant={familyTreeId === 1 ? 'contained' : 'outlined'}
                    onClick={() => handleFamilyTreeId(1)}
                >
                    User 1
                </Button>
                <Button
                    variant={familyTreeId === 2 ? 'contained' : 'outlined'}
                    onClick={() => handleFamilyTreeId(2)}
                >
                    User 2
                </Button>
            </div>
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
        </div>

    )
}

export default ViewData;