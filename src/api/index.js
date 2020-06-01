import request from './request.js';

export function testList() {
    return request({
        url: '/test/list1',
        method: 'get',
    })
}

export function testList2() {
    return request({
        url: '/test/list2',
        method: 'get',
    })
}