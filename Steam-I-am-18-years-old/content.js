(() => {
  const sessionid = document.cookie.split(';').find(x => x.includes('sessionid'))?.trim() ?? undefined
  if (!sessionid) {
    return alert('没有登录！')
  }
  const header = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest'},
    url = 'https://store.steampowered.com/account/savecontentdescriptorpreferences',
    params = {
      hd1_store: `hidden_descids_store%5B%5D=3&hidden_descids_community%5B%5D=1&hidden_descids_community%5B%5D=4&hidden_descids_community%5B%5D=3&${sessionid}`,
      hd1_community: `hidden_descids_store%5B%5D=3&hidden_descids_community%5B%5D=3&${sessionid}`,
      hd2_store: `hidden_descids_community%5B%5D=3&${sessionid}`,
      hd2_community: `${sessionid}`
    }
  Promise.all(Object.values(params).map(param => fetch(url, {
    method: 'POST',
    headers: header,
    body: param
  }))
  ).then((resps) => {
    if (resps.every(resp => resp.ok)) {
      // 变更：防止 Steam 客户端卡住，改为访问账户页面
      if (confirm('完成！点击确定将前往 Steam 账户页面！')) {
        window.location.href = 'https://store.steampowered.com/account/';
      }
    }
  }).catch(() => {
    alert('看上去这个方法已经失效了！')
  })
})()