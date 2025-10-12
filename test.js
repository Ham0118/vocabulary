/**
 * 调用本地 TTS 接口，将文字转换为语音文件
 * @param {string} text - 要转换的文字
 * @param {Object} [options] - 可选参数
 * @param {string} [options.voice="mysound.wav"] - 输出语音文件名
 * @param {string} [options.model="default"] - 使用的模型
 * @param {string} [options.language="zh-cn"] - 语言
 * @param {number} [options.speed=1] - 语速
 * @returns {Promise<Response>} fetch Response 对象
 */
async function ttsRequest(text, options = {}) {
  const {
    voice = "mysound.wav",
    model = "default",
    language = "zh-cn",
    speed = 1,
  } = options;

  const body = new URLSearchParams({
    voice,
    model,
    text,
    language,
    speed: String(speed),
  });

  const response = await fetch("http://127.0.0.1:9988/tts", {
    method: "POST",
    headers: {
      "accept": "*/*",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`TTS 请求失败: ${response.status} ${response.statusText}`);
  }

  return response;
}

// ✅ 使用示例
ttsRequest("再把鸡腿切成块")
  .then(res => {
    console.log(res)
  })
  .catch(console.error);