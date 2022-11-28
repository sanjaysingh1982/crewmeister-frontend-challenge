import { MDBDataTable } from 'mdbreact';
import PropTypes from 'prop-types';

const Table = ({ events }: any) => {
    const data = {
        columns: [
            {
                label: 'Title',
                field: 'title',
                sort: 'asc',
            },
            {
                label: 'Type',
                field: 'type',
                sort: 'asc',
            },
            {
                label: 'Start Date',
                field: 'startDate',
                sort: 'asc',
            },
            {
                label: 'End Date',
                field: 'endDate',
                sort: 'asc',
            },
            {
                label: 'Member Note',
                field: 'memberNote',
                sort: 'asc',
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
            },
            {
                label: 'Admitter Note',
                field: 'admitterNote',
                sort: 'asc',
            }
        ],
        rows: events
    };

    return (
        <MDBDataTable
            striped
            bordered
            small
            noBottomColumns={true}
            data={data}
        />
    );
};

Table.propTypes = {
    events: PropTypes.array
};

Table.defualtProps = {
    events: []
};

export default Table;