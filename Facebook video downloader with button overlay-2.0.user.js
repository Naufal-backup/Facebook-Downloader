// ==UserScript==
// @name        Facebook video downloader with button overlay
// @icon        https://www.facebook.com/favicon.ico
// @namespace   Violentmonkey Scripts
// @match       https://www.facebook.com/*
// @match       https://web.facebook.com/*
// @grant       none
// @version     2.0
// @author      Modified version
// @description Download Facebook video dengan tombol overlay langsung di video
// @license MIT
// ==/UserScript==

(() => {
  // Styling untuk tombol download
  const style = document.createElement('style');
  style.textContent = `
    .fb-video-download-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .fb-video-download-btn:hover {
      background: rgba(24, 119, 242, 0.9);
      transform: scale(1.05);
    }

    .fb-video-download-btn:active {
      transform: scale(0.95);
    }

    .fb-video-download-btn.downloading {
      background: rgba(255, 165, 0, 0.8);
      cursor: wait;
    }

    .fb-video-download-btn.success {
      background: rgba(0, 200, 0, 0.8);
    }

    .fb-video-download-btn.error {
      background: rgba(200, 0, 0, 0.8);
    }

    .fb-download-icon {
      width: 16px;
      height: 16px;
    }
  `;
  document.head.appendChild(style);

  // Icon SVG untuk tombol download
  const downloadIcon = `
    <svg class="fb-download-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
  `;

  function getVideoIdFromVideoElement(videoEle) {
    try {
      let key = "";
      for (let k in videoEle.parentElement) {
        if (k.startsWith("__reactProps")) {
          key = k;
          break;
        }
      }
      const props = videoEle.parentElement[key].children.props;
      return props.videoFBID || props.coreVideoPlayerMetaData?.videoFBID;
    } catch (e) {
      console.log("ERROR on get videoFBID: ", e);
      return null;
    }
  }

  async function getVideoUrlFromVideoId(videoId) {
    let dtsg = await getDtsg();
    try {
      return await getLinkFbVideo2(videoId, dtsg);
    } catch (e) {
      return await getLinkFbVideo1(videoId, dtsg);
    }
  }

  async function getLinkFbVideo2(videoId, dtsg) {
    let res = await fetch(
      "https://www.facebook.com/video/video_data_async/?video_id=" + videoId,
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: stringifyVariables({
          __a: "1",
          fb_dtsg: dtsg,
        }),
      }
    );

    let text = await res.text();
    text = text.replace("for (;;);", "");
    let json = JSON.parse(text);

    const { hd_src, hd_src_no_ratelimit, sd_src, sd_src_no_ratelimit } =
      json?.payload || {};

    return hd_src_no_ratelimit || hd_src || sd_src_no_ratelimit || sd_src;
  }

  async function getLinkFbVideo1(videoId, dtsg) {
    let res = await fetchGraphQl("5279476072161634", {
      UFI2CommentsProvider_commentsKey: "CometTahoeSidePaneQuery",
      caller: "CHANNEL_VIEW_FROM_PAGE_TIMELINE",
      displayCommentsContextEnableComment: null,
      displayCommentsContextIsAdPreview: null,
      displayCommentsContextIsAggregatedShare: null,
      displayCommentsContextIsStorySet: null,
      displayCommentsFeedbackContext: null,
      feedbackSource: 41,
      feedLocation: "TAHOE",
      focusCommentID: null,
      privacySelectorRenderLocation: "COMET_STREAM",
      renderLocation: "video_channel",
      scale: 1,
      streamChainingSection: !1,
      useDefaultActor: !1,
      videoChainingContext: null,
      videoID: videoId,
    }, dtsg);
    let text = await res.text();

    let a = JSON.parse(text.split("\n")[0]),
      link = a.data.video.playable_url_quality_hd || a.data.video.playable_url;

    return link;
  }

  function fetchGraphQl(doc_id, variables, dtsg) {
    return fetch("https://www.facebook.com/api/graphql/", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: stringifyVariables({
        doc_id: doc_id,
        variables: JSON.stringify(variables),
        fb_dtsg: dtsg,
        server_timestamps: !0,
      }),
    });
  }

  function stringifyVariables(d, e) {
    let f = [],
      a;
    for (a in d)
      if (d.hasOwnProperty(a)) {
        let g = e ? e + "[" + a + "]" : a,
          b = d[a];
        f.push(
          null !== b && "object" == typeof b
            ? stringifyVariables(b, g)
            : encodeURIComponent(g) + "=" + encodeURIComponent(b)
        );
      }
    return f.join("&");
  }

  async function getDtsg() {
    return require("DTSGInitialData").token;
  }

  // Download langsung tanpa membuka tab baru
  async function downloadVideoDirectly(url, filename = "fb_video.mp4") {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup blob URL setelah delay
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (e) {
      console.error("Download error:", e);
      throw e;
    }
  }

  // Fungsi untuk menambahkan tombol download ke video
  function addDownloadButton(videoElement) {
    // Cek apakah sudah ada tombol
    const videoContainer = videoElement.closest('div[style*="position"]') || videoElement.parentElement;
    if (videoContainer.querySelector('.fb-video-download-btn')) {
      return;
    }

    // Pastikan container memiliki position relative
    if (getComputedStyle(videoContainer).position === 'static') {
      videoContainer.style.position = 'relative';
    }

    const videoId = getVideoIdFromVideoElement(videoElement);
    if (!videoId) return;

    // Buat tombol download
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'fb-video-download-btn';
    downloadBtn.innerHTML = downloadIcon + '<span>Download</span>';
    downloadBtn.title = 'Download video ini';

    downloadBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const textSpan = downloadBtn.querySelector('span');
      const originalText = textSpan.textContent;

      try {
        // Status: Downloading
        downloadBtn.classList.add('downloading');
        textSpan.textContent = 'Mengunduh...';
        downloadBtn.disabled = true;

        const videoUrl = await getVideoUrlFromVideoId(videoId);

        if (!videoUrl) {
          throw new Error('URL video tidak ditemukan');
        }

        await downloadVideoDirectly(videoUrl);

        // Status: Success
        downloadBtn.classList.remove('downloading');
        downloadBtn.classList.add('success');
        textSpan.textContent = 'Berhasil!';

        setTimeout(() => {
          downloadBtn.classList.remove('success');
          textSpan.textContent = originalText;
          downloadBtn.disabled = false;
        }, 2000);

      } catch (error) {
        console.error('Download error:', error);

        // Status: Error
        downloadBtn.classList.remove('downloading');
        downloadBtn.classList.add('error');
        textSpan.textContent = 'Gagal!';

        setTimeout(() => {
          downloadBtn.classList.remove('error');
          textSpan.textContent = originalText;
          downloadBtn.disabled = false;
        }, 2000);
      }
    });

    videoContainer.appendChild(downloadBtn);
  }

  // Observer untuk mendeteksi video baru
  const observer = new MutationObserver((mutations) => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      addDownloadButton(video);
    });
  });

  // Mulai observasi
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Tambahkan tombol ke video yang sudah ada
  setTimeout(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      addDownloadButton(video);
    });
  }, 2000);

  console.log('Facebook Video Downloader dengan tombol overlay berhasil dimuat!');
})();