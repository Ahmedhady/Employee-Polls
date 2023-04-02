import { render } from '@testing-library/react';
import PageNotFound from '../components/PageNotFound';

describe('NoFoundPage', () => {
    it('matches the snapshot', () => {
        const component = render(< PageNotFound />);
        expect(component).toMatchSnapshot();
    });
});