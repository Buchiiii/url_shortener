import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
    vus: 5000,
    duration: '60s',
    thresholds: {
        http_req_duration: ['p(95)<500']
    }

}

export default function () {
    const res = http.get(`${BASE_URL}/4C93`, {
        redirects: 0,
    });


    sleep(1);
}

export function handleSummary(data) {
    return {
        "load-test-report-5000VUS(Without Optimization).html": htmlReport(data),
    };
}