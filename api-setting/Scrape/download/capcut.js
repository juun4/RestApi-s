const axios = require('axios');

async function capcutDl(url) {
  try {
    if (!url) throw new Error('Parameter url wajib diisi');

    const headers = {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      origin: 'https://3bic.com',
      referer: 'https://3bic.com/',
      'user-agent': 'Mozilla/5.0'
    };

    const { data } = await axios.post(
      'https://3bic.com/api/download',
      { url },
      { headers }
    );

    if (!data || !data.originalVideoUrl) {
      return { status: false, msg: 'Gagal ambil data' };
    }

    const base64url = String(data.originalVideoUrl).split('/api/cdn/')[1];
    if (!base64url) return { status: false, msg: 'Link video tidak ditemukan' };

    const video = Buffer.from(base64url, 'base64').toString();

    return {
      title: data.title || '',
      author: data.authorName || '',
      thumbnail: data.coverUrl || '',
      video
    };
  } catch (err) {
    return { status: false, msg: err.message || String(err) };
  }
};

module.exports = async function(url){
  if (!url) throw new Error('Parameter "url" wajib');
  return capcutDl(url.toString());
};
