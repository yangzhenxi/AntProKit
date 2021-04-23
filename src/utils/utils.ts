/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

/**
 * 获取类型
 * @param { Object } object
 */
function TYPE(object: any) {
  return Function.prototype.call
    .bind(Object.prototype.toString)(object)
    .match(/\[object (.+?)\]/)[1];
}

/**
 * 是否为空 '', undefined，null, [], {}
 * @param { any } object 对象
 */
export function isEmpty(object: any) {
  const type = TYPE(object);
  switch (type) {
    case 'String':
      return object === '';
    case 'Undefined':
      return true;
    case 'Null':
      return true;
    case 'Array':
      return object.length === 0;
    case 'Object':
      return Object.keys(object).length === 0;
    default:
      return false;
  }
}
