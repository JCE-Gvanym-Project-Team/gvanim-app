import React, { useState } from 'react';
import { TextField, Select, MenuItem, Container, Typography } from '@mui/material';
import JobList from '../Jobs/JobList';
import JobsSection from '../Jobs/JobsSectionGrid';
import Search from './Search'

const Filters = ({ jobs, locations }) => {
    // Set up state to store the selected filter options and search query
    const [filters, setFilters] = useState({
        location: '',
        scope: '',
        datePosted: [null, null],
        jobTitle: '',
        searchQuery: '',
    });

    // Update the state when the user changes a filter option or search query
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    // Update the state when the user selects a date range for the date posted filter
    const handleDateChange = (name) => (date) => {
        setFilters({ ...filters, [name]: date });
    };

    // Filter the job data based on the selected filter options and search query
    const filterJobs = () => {
        return jobs.filter((job) => {
            const { location, scope, datePosted, jobTitle, searchQuery } = filters;
            return (
                (location === '' || job.location === location) &&
                (scope === '' || job.scope >= parseInt(scope, 10)) &&
                (datePosted[0] === null || job.datePosted >= datePosted[0]) &&
                (datePosted[1] === null || job.datePosted <= datePosted[1]) &&
                (jobTitle === '' || job.title.toLowerCase().includes(jobTitle.toLowerCase())) &&
                (searchQuery === '' ||
                    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
    };

    // Get the filtered job data
    const filteredJobs = filterJobs();

    // Render the filter options and the filtered job data using the JobList component
    return (
        <Container>
            <Search num_of_jobs={filterJobs.length} />
            <Typography name="jobTitle" label="Job Title" onChange={handleFilterChange} >
                חפשו לפי:
            </Typography>
            <Select name="location" value={filters.location} onChange={handleFilterChange}>
                <MenuItem value="">All Locations</MenuItem>
                <MenuItem value="New York">New York</MenuItem>
                <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                <MenuItem value="Chicago">Chicago</MenuItem>
                {/* add more menu items as needed */}
            </Select>
            <TextField name="scope" label="Job Scope" onChange={handleFilterChange} />
            <Select>
                <MenuItem value="">Sort by Scope</MenuItem>
                <MenuItem value="newest">Newest to Oldest</MenuItem>
                <MenuItem value="oldest">Oldest to Newest</MenuItem>
            </Select>
            <TextField name="searchQuery" label="Search" onChange={handleFilterChange} />
            <JobsSection jobs={filteredJobs} locations={locations} />
        </Container>
    );
};

export default Filters;