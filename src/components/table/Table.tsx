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
                label: 'type',
                field: 'type',
                sort: 'asc',
            },
            {
                label: 'start date',
                field: 'startDate',
                sort: 'asc',
            },
            {
                label: 'end date',
                field: 'endDate',
                sort: 'asc',
            },
            {
                label: 'created at',
                field: 'createdAt',
                sort: 'asc',
            },
            {
                label: 'confirmed at',
                field: 'confirmedAt',
                sort: 'asc',
            }, {
                label: 'note',
                field: 'memberNote',
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