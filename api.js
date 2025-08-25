addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * 处理请求并返回JSON响应
 * @param {Request} request
 */
async function handleRequest(request) {
  // 解析URL和查询参数
  const url = new URL(request.url)
  const name = url.searchParams.get('name')
  
  // 准备响应数据
  let responseData, statusCode
  if (name) {
    // 有name参数时的成功响应
    responseData = {
      success: true,
      message: `Hello, ${name}!`,
      received_name: name,
      length: name.length,
      uppercase: name.toUpperCase(),
      lowercase: name.toLowerCase(),
      timestamp: new Date().toISOString()
    }
    statusCode = 200
  } else {
    // 无name参数时的错误响应
    responseData = {
      success: false,
      error: "缺少必要参数",
      message: "请提供name参数",
      usage: `${url.origin}?name=你的名字`,
      timestamp: new Date().toISOString()
    }
    statusCode = 400
  }
  
  // 返回JSON响应，设置正确的Content-Type
  return new Response(JSON.stringify(responseData, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*', // 允许所有域名调用API
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    status: statusCode
  })
}
