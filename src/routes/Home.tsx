import React, { Fragment, Suspense, useContext, useEffect, useState } from 'react';
import moment from 'moment';
import download from 'downloadjs';
import PropTypes from 'prop-types'
import querystring from 'query-string';
import { DataContext } from '../context/data.context';

const BasicShell = React.lazy(() => import('../shell/basicShell'));
const Table = React.lazy(() => import('../components/table/Table'));

const ics = require('ics');

const HomePage = ({ location }: any) => {
    const { getAllEventData } = useContext(DataContext); 
    const [ events, setEvents ] = useState([]); 
    const [ loading, setLoading ] = useState(true);  
    const [ eventFileDataToExport, setEventFileDataToExport ] = useState(null);  

    const downloadIcs = (e: any) => {
        e.preventDefault();
        if (!eventFileDataToExport) {
            const eventToExport = events.map((event: any) => {
                const eventStartDate = moment(event.startDate, 'YYYY-MM-DD').format('YYYY-MM-DD').split('-').map(value => Number(value));
                const eventEndDate = moment(event.endDate, 'YYYY-MM-DD').format('YYYY-MM-DD').split('-').map(value => Number(value));
                return {
                    title: event.title,
                    start: eventStartDate,
                    end: eventEndDate,
                    calName: 'AbsenceCalendar'
                }
            });

            const {error, value} = ics.createEvents(eventToExport);
            if (error) {
                return
            }
            setEventFileDataToExport(value);
            download(value, 'AbsenceCalendar.ics', 'text/plain');
        }

        download(eventFileDataToExport, 'AbsenceCalendar.ics', 'text/plain');
    };

    useEffect(() => {
        const searchTerm = location.search.slice(1);
        const queryParamsObject = querystring.parse(searchTerm);
        setEvents([...getAllEventData(queryParamsObject)]);
        setLoading(false);
    }, [location, getAllEventData]); 

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BasicShell>
                { loading ? 'loading...' :
                    <Fragment>
                        {events.length > 0 && <div className={'clearfix'}>
                            <button className={'btn btn-secondary float-right download'}
                                    onClick={downloadIcs}>Download
                            </button>
                        </div>}
                        <Suspense fallback={<div>Loading...</div>}>
                            <Table events={events}/>
                        </Suspense>
                    </Fragment>
                }
            </BasicShell>
        </Suspense>
    );
};

HomePage.propTypes = {
    location: PropTypes.object.isRequired
};

export default HomePage;
