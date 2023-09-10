import React, { useState, useEffect } from 'react';
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
    const fullName = `${person.givenName} ${person.surname}`;
    let dateRange = "";

    if (person.birthDate && person.deathDate) {
        dateRange = `(${person.birthDate.split('-')[0]}-${person.deathDate.split('-')[0]})`;
    } else if (person.deathDate) {
        dateRange = `(-${person.deathDate.split('-')[0]})`;
    } else if (person.birthDate) {
        const birthYear = person.birthDate.split('-')[0];
        const currentYear = new Date().getFullYear();
        dateRange = currentYear - birthYear < 120 ? "(Living)" : `(${birthYear}-Living)`;
    } else {
        dateRange = "(Living)";
    }

    return `${fullName} ${dateRange}`;
};

const fetchPeopleData = async (familyTreeId) => {
    try {
        const response = await fetch(`person/${familyTreeId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};

const DropDown = () => {
    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null); // Track the selected person

    const familyTreeId = 1;

    useEffect(() => {
        fetchPeopleData(familyTreeId).then((data) => {
            setPeople(data);
        });
    }, [familyTreeId]);

    return (
        <main>
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
                    <p>Name: {selectedPerson.givenName} {selectedPerson.surname}</p>
                    <p>Gender: {selectedPerson.gender || "Unknown"}</p>
                    <p>Birth Date: {formatDate(selectedPerson.birthDate)}</p>
                    <p>Birth Location: {selectedPerson.birthLocation || 'Unknown'}</p>
                    <p>Death Date: {formatDate(selectedPerson.deathDate)}</p>
                    <p>Death Location: {selectedPerson.deathLocation || "Unknown"}</p>
                </div>
            )}
        </main>
    );
};

export default DropDown;
