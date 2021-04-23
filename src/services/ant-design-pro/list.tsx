// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function getList(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/list', {
    method: 'POST',
    ...(options || {}),
  });
}
