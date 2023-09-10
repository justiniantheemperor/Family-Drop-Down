﻿import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
        dateRange = `(${formatDate(person.birthDate)} - ${formatDate(person.deathDate)})`;
    } else if (person.deathDate) {
        dateRange = `(-${formatDate(person.deathDate)})`;
    } else if (person.birthDate) {
        dateRange = `(${formatDate(person.birthDate)} - Living)`;
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
    const [familyTreeId, setFamilyTreeId] = useState(1); // Initial familyTreeId

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
                <button onClick={() => handleFamilyTreeIdChange(1)}>User 1</button>
                <button onClick={() => handleFamilyTreeIdChange(2)}>User 2</button>
            </div>
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
                <div>
                    <h2>Selected Person:</h2>
                    <p>Name: {selectedPerson.givenName || 'Unknown'} {selectedPerson.surname || 'Unknown'}</p>
                    <p>Gender: {selectedPerson.gender || 'Unknown'}</p>
                    <p>Birth Date: {formatDate(selectedPerson.birthDate)}</p>
                    <p>Birth Location: {selectedPerson.birthLocation || 'Unknown'}</p>
                    <p>Death Date: {formatDate(selectedPerson.deathDate)}</p>
                    <p>Death Location: {selectedPerson.deathLocation || 'Unknown'}</p>
                </div>
            )}
        </main>
    );
};

export default DropDown;
