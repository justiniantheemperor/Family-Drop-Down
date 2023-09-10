import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
            />
        </main>
    );
};

export default DropDown;
