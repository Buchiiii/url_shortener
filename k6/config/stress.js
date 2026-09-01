import { thresholds } from '../helpers/thresholds.js';

export const options = {
    stages: [{
        duration: '60s',
        target: 100
    },
        , {
        duration: '30s',
        target: 500
    }
        , {
        duration: '30s',
        target: 1000
    }, {
        duration: '30s',
        target: 1500
    },
    {
        duration: '30s',
        target: 2000
    }, {
        duration: '30s',
        target: 5000
    }
    ],
    thresholds
}