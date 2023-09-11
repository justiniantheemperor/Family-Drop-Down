import React, { useState, useEffect } from 'react';
import '../custom.css'
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@mui/material';

// Map Gender numerical values to their corresponding strings
const genderMap = {
    0: 'Male',
    1: 'Female',
    2: 'Other',
    3: 'Unknown',
};

const ViewData = () => {
    const [people, setPeople] = useState([]);
    const [familyTreeId, setFamilyTreeId] = useState(1);
    const [orderBy, setOrderBy] = useState('givenName');
    const [order, setOrder] = useState('asc');

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

    const sortData = (field) => {
        const isAscending = orderBy === field && order === 'asc';
        const newOrder = isAscending ? 'desc' : 'asc';
        setOrderBy(field);
        setOrder(newOrder);

        // Sort the data based on the selected field and order
        const sortedData = [...people].sort((a, b) => {
            if (field === 'gender') {
                // Sort by numerical gender value
                return isAscending ? a[field] - b[field] : b[field] - a[field];
            } else {
                // Sort by other fields using localeCompare
                return isAscending ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
            }
        });

        setPeople(sortedData);
    };

    return (
        <div>
            <Button
                variant={familyTreeId === 1 ? 'contained' : 'outlined'}
                onClick={() => setFamilyTreeId(1)}
            >
                User 1
            </Button>&emsp;
            <Button
                variant={familyTreeId === 2 ? 'contained' : 'outlined'}
                onClick={() => setFamilyTreeId(2)}
            >
                User 2
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'givenName'}
                                direction={orderBy === 'givenName' ? order : 'asc'}
                                onClick={() => sortData('givenName')}
                            >
                                First Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'surname'}
                                direction={orderBy === 'surname' ? order : 'asc'}
                                onClick={() => sortData('surname')}
                            >
                                Last Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'gender'}
                                direction={orderBy === 'gender' ? order : 'asc'}
                                onClick={() => sortData('gender')}
                            >
                                Gender
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Birth Date</TableCell>
                        <TableCell>Birth Location</TableCell>
                        <TableCell>Death Date</TableCell>
                        <TableCell>Death Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {people.map((person) => (
                        <TableRow key={person.id}>
                            <TableCell>{person.givenName}</TableCell>
                            <TableCell>{person.surname}</TableCell>
                            <TableCell>{genderMap[person.gender] || 'Unknown'}</TableCell>
                            <TableCell>{person.birthDate}</TableCell>
                            <TableCell>{person.birthLocation || 'Unknown'}</TableCell>
                            <TableCell>{person.deathDate}</TableCell>
                            <TableCell>{person.deathLocation || 'Unknown'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ViewData;
