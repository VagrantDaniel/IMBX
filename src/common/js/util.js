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

// 规定时间格式
export function formatTime (time) {
  if(time){
    if(time < 60){
      time = `00:${time < 10 ? `0${time}`: time}`
    }else{
      time = `${parseInt(time/60) < 10 ? `0${parseInt(time/60)}`: parseInt(time/60)}:${time%60 < 10 ? `0${time%60}`: parseInt(time%60)}`
    }
    return time;
  }else{
    return `00:00`
  }
}

// 规定播放次数
export function formatPlayCount (playcount){
  let count = playcount.toString();
  return count.substring(0, count.length - 4);
}
