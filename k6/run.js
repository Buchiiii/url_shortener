import { options } from './config/stress.js';
import redirectScenario from './scenarios/redirect.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';


export { options };

export default function () {
    redirectScenario(BASE_URL);
}

export function handleSummary(data) {
    return {
        "stress-test-report(With Caching).html": htmlReport(data),
    };
}