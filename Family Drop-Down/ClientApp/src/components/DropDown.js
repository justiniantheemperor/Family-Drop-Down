import React, { useState, useEffect } from 'react';
import '../custom.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Button, Card, Container, CardContent } from '@mui/material';

// Map Gender numerical values to their corresponding strings
const genderMap = {
    0: 'Male',
    1: 'Female',
    2: 'Other',
    3: 'Unknown',
};

// Helper function to format date
const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';

    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const formatDisplay = (person) => {
    const fullName = `${person.givenName || 'Unknown'} ${person.surname || 'Unknown'}`;
    let dateRange = '';

    if (person.birthDate && person.deathDate) {
        dateRange = `(${person.birthDate.split('-')[0]} - ${person.deathDate.split('-')[0]})`;
    } else if (person.deathDate) {
        dateRange = `(-${person.deathDate.split('-')[0]})`;
    } else if (person.birthDate) {
        dateRange = `(${person.birthDate.split('-')[0]} - Living)`;
    } else {
        dateRange = '(Living)';
    }

    return `${fullName} ${dateRange}`;
};

const fetchPeopleData = async (familyTreeId) => {
    try {
        const response = await fetch(`person/${familyTreeId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
    }
};

const DropDown = () => {
    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null); // Track the selected person
    const [familyTreeId, setFamilyTreeId] = useState(1); 

    useEffect(() => {
        fetchPeopleData(familyTreeId).then((data) => {
            setPeople(data);
        });
    }, [familyTreeId]);

    const handleFamilyTreeIdChange = (newId) => {
        // Change familyTreeId and trigger data fetching when the button is clicked
        setFamilyTreeId(newId);
    };

    return (
        <main>
            <div>
                <Button
                    variant={familyTreeId === 1 ? 'contained' : 'outlined'}
                    onClick={() => handleFamilyTreeIdChange(1)}
                >
                    User 1
                </Button>
                &emsp;
                <Button
                    variant={familyTreeId === 2 ? 'contained' : 'outlined'}
                    onClick={() => handleFamilyTreeIdChange(2)}
                >
                    User 2
                </Button>
            </div>
            <Container>
            <Autocomplete
                id="person-select"
                options={people}
                getOptionLabel={(person) => formatDisplay(person)}
                renderInput={(params) => <TextField {...params} label="Select a person" />}
                onChange={(event, newValue) => {
                    setSelectedPerson(newValue); // Update selected person
                }}
            />
            {selectedPerson && ( // Render selected person's information if available
                <Card variant="outlined">
                    <CardContent>
                    <h2>{selectedPerson.givenName} {selectedPerson.surname}</h2>
                        <p>Gender: {genderMap[selectedPerson.gender] || 'Unknown'} </p>
                        <p>Birth Date: {formatDate(selectedPerson.birthDate)}</p>
                        <p>Birth Location: {selectedPerson.birthLocation || 'Unknown'}</p>
                        <p>Death Date: {formatDate(selectedPerson.deathDate)}</p>
                        <p>Death Location: {selectedPerson.deathLocation || 'Unknown'}</p>
                    </CardContent>
                </Card>
                )}
            </Container>

        </main>
    );
};

export default DropDown;
