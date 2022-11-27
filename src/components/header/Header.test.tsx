import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import Header from './Header';

const setup = (props = {}, state = null) => {
    const defaultProps = {};
    const setUpProps = {...defaultProps, ...props};
    const wrapper = shallow(<Header {...setUpProps}/>);
    const tree = () => renderer.create(<Header {...setUpProps}/>).toJSON();
    if (state) wrapper.setState(state);
    return { wrapper, props: setUpProps, tree };
};

describe('Header component', () => {
    it('should match with snapshot', () => {
        const { tree } = setup();
        expect(tree()).toMatchSnapshot();
    });

    it('Should contain header tag', () => {
        const { wrapper } = setup();
        expect(wrapper.find('header').length).toBe(1);
    });
});