// 日期规范函数
export const formatDate = (
  obj,
  opt = {
    y: true,
    m: true,
    d: true
  }
) => {
  const t = new Date(obj);
  const y = t.getFullYear();
  let m = '0' + (t.getMonth() + 1);
  m = m.substring(m.length - 2, m.length);
  let d = '0' + t.getDate();
  d = d.substring(d.length - 2, d.length);

  const res = [];
  if (opt.y) { res.push(y); }
  if (opt.m) { res.push(m); }
  if (opt.d) { res.push(d); }

  return res.join('-');
};

// 查找当前的索引
export function findIndex (allList, list) {
  return allList.findIndex((item) => {
    return item.id === list.id;
  });
}
