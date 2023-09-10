import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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

    const formatData = (person) => {
        if (person.birthDate && person.deathDate) {
            // Person has both birth and death dates
            return {
                value: person.id,
                display: `${person.givenName} (${person.birthDate.split('-')[0]}-${person.deathDate.split('-')[0]})`,
            };
        } else if (person.deathDate) {
            // Person has only a death date
            return {
                value: person.id,
                display: `${person.givenName} (-${person.deathDate.split('-')[0]})`,
            };
        } else if (person.birthDate) {
            // Person has only a birth date
            const birthYear = person.birthDate.split('-')[0];
            const currentYear = new Date().getFullYear();
            if (currentYear - birthYear < 120) {
                // Person is less than 120 years old
                return {
                    value: person.id,
                    display: `${person.givenName} (Living)`,
                };
            } else {
                return {
                    value: person.id,
                    display: `${person.givenName} (${birthYear}-Living)`,
                };
            }
        } else {
            // Person has neither birth nor death date
            return {
                value: person.id,
                display: `${person.givenName} (Living)`,
            };
        }
    };


    return (
        <main>
            <Autocomplete
                id="person-select"
                options={people}
                getOptionLabel={(person) => formatData(person).display}
                renderInput={(params) => <TextField {...params} label="Select a person" />}
            />
        </main>
    );
};

export default DropDown;
