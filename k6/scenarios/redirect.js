import http from 'k6/http';
import { sleep } from 'k6';


export default function redirectScenario(baseUrl) {
    const res = http.get(`${baseUrl}/4C93`, {
        redirects: 0,
    });

    sleep(1);
}
