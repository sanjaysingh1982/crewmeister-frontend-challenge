import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Table from './Table';


const setup = (props = {}, state = null) => {
    const defaultProps = {
        events: [{
            'admitterId': null,
            'admitterNote': '',
            'confirmedAt': '2016-12-12T18:03:55.000+01:00',
            'createdAt': '2016-12-12T14:17:01.000+01:00',
            'crewId': 352,
            'endDate': '2017-01-13',
            'id': 2351,
            'memberNote': '',
            'rejectedAt': null,
            'startDate': '2017-01-13',
            'type': 'sickness',
            'userId': 2664
        },
            {
                'admitterId': null,
                'admitterNote': '',
                'confirmedAt': '2017-01-03T17:39:50.000+01:00',
                'createdAt': '2017-01-03T17:36:52.000+01:00',
                'crewId': 352,
                'endDate': '2017-01-05',
                'id': 2521,
                'memberNote': 'ganzer tag',
                'rejectedAt': null,
                'startDate': '2017-01-05',
                'type': 'vacation',
                'userId': 2664
            }
        ]
    };
    const setUpProps = {...defaultProps, ...props};
    const wrapper = shallow(<Table {...setUpProps}/>);
    const tree = () => renderer.create(<Table {...setUpProps}/>).toJSON();
    if (state) wrapper.setState(state);
    return {wrapper, props: setUpProps, tree};
};

describe('Table component', () => {
    it('should match with snapshot', () => {
        const {tree} = setup();
        expect(tree()).toMatchSnapshot();
    });
});