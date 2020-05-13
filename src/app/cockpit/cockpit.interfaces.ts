export interface RunningBooklet  {
    'groupname': string;
    'loginname': string;
    'code': string;
    'bookletname': string;
    'locked': false;
    'lastlogin': string;
    'laststart': string;
}

export interface TestInstance {

    person: string;
    status: string;
    test: string;
}
