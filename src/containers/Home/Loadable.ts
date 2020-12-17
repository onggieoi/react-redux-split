/**
 * Asynchronously loads the component for HomePage
 */

import loadable from 'src/utils/loadable';

export default loadable(async () => await import('./index'));
