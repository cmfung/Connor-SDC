import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 2000,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<2000'],
  },
};

const prodID = Math.floor(Math.random() * (1000011 - 1) + 1);

const queryParams = {
  productID: 1,
  page: '1',
  count: '100',
};

const defaultHost = 'http://localhost:4000';

export default function () {
  http.get(`${defaultHost}/qa/questions/subquery?productID=${prodID}&page=${queryParams.page}&count=${queryParams.count}`);
  // http.get(`${defaultHost}/qa/questions/jscompile?productID=${queryParams.productID}&page=${queryParams.page}&count=${queryParams.count}`);
  sleep(1);
}
