import React from 'react';
import moment from 'moment';
import absences from '../server/json_files/absences.json';
import members from '../server/json_files/members.json';

export const DataContext = React.createContext(null);

export const getAllMembers = () => {
    const hash: any = {};
    members.payload.forEach((member: any) => hash[member.userId] = member);
    return hash;
};

export const getUserNameWithType = (userName: any, absenceType: any) => {
    switch (absenceType) {
        case 'sickness' :
            return `${userName} is sick`;
        case 'vacation' :
            return `${userName} is on vacation`;
        default :
            return `${userName} is on vacation`;
    }
};

const getEventByUserId = (allAbsences: any, userId: any) => {
    return allAbsences.filter((absence: any) => parseInt(absence.userId) === parseInt(userId));
};

const getEventByStartEndDate = (allAbsences: any, startDate: any, endDate: any) => {
    return allAbsences.filter((absence: any) => moment(absence.startDate) >= moment(startDate) && moment(absence.endDate) <= moment(endDate));
};

export const getAllAbsences = (filters: any) => {
    let allMatchedEvents = [];
    let allAbsences = absences.payload;
    const allMembers = getAllMembers();
    const noFilters = Object.keys(filters).length === 0;

    if ('userId' in filters) {
        allMatchedEvents = getEventByUserId(allAbsences, filters.userId);
    }
    if ('startDate' in filters && 'endDate' in filters) {
        if (allMatchedEvents.length) allAbsences = allMatchedEvents;
        allMatchedEvents = getEventByStartEndDate(allAbsences, filters.startDate, filters.endDate);
    }

    if (noFilters) {
        allMatchedEvents = allAbsences;
    }

    allMatchedEvents = allMatchedEvents.map((event: any) => {
        const userName = allMembers[event.userId].name;
        const absenceType = event.type.toLowerCase();
        return {
            ...event,
            confirmedAt: moment(event.confirmedAt).format('YYYY-MM-DD'),
            createdAt: moment(event.createdAt).format('YYYY-MM-DD'),
            title: getUserNameWithType(userName, absenceType)
        }
    });

    return allMatchedEvents;
};

export const DataProvider = (props: any) => {
    const { children } = props;

    const getAllEventData = (filters: any) => getAllAbsences(filters);

    return (
        <DataContext.Provider value={{ getAllEventData }}>
            {children}
        </DataContext.Provider>
    );
};
