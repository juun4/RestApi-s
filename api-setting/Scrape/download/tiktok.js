const axios = require("axios");

function formatNumber(n) {
  const numb = parseInt(n ?? 0, 10);
  return Number.isFinite(numb) ? Number(numb).toLocaleString("id-ID") : "0";
}

function formatDate(sec, locale = "id-ID") {
  const d = new Date((sec ?? 0) * 1000);
  return d.toLocaleString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

async function tiktokDl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = "https://www.tikwm.com/api/";
      const { data } = await axios.get(domain, {
        headers: {
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          "Referer": "https://www.tikwm.com/",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
          "X-Requested-With": "XMLHttpRequest",
        },
        params: { url, hd: 1 },
      });

      const res = data?.data;
      if (!res) throw new Error(data?.msg || "Gagal mengambil data dari TikWM");

      const files = [];
      if (!res.size && !res.wm_size && !res.hd_size && Array.isArray(res.images)) {
        res.images.forEach((v) => files.push({ type: "photo", url: v }));
      } else {
        if (res.wmplay) files.push({ type: "watermark", url: res.wmplay });
        if (res.play) files.push({ type: "nowatermark", url: res.play });
        if (res.hdplay) files.push({ type: "nowatermark_hd", url: res.hdplay });
      }

      resolve({
        status: true,
        title: res.title,
        taken_at: formatDate(res.create_time),
        region: res.region,
        id: res.id,
        durations: res.duration,
        duration: `${res.duration} Seconds`,
        cover: res.cover,
        size_wm: res.wm_size,
        size_nowm: res.size,
        size_nowm_hd: res.hd_size,
        data: files,
        music_info: {
          id: res.music_info?.id,
          title: res.music_info?.title,
          author: res.music_info?.author,
          album: res.music_info?.album ?? null,
          url: res.music || res.music_info?.play,
        },
        stats: {
          views: formatNumber(res.play_count),
          likes: formatNumber(res.digg_count),
          comment: formatNumber(res.comment_count),
          share: formatNumber(res.share_count),
          download: formatNumber(res.download_count),
        },
        author: {
          id: res.author?.id,
          fullname: res.author?.unique_id,
          nickname: res.author?.nickname,
          avatar: res.author?.avatar,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = tiktokDl
