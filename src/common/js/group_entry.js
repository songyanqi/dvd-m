var groupEntryData = {

  /* 小程序原始id*/
  programId: 'gh_446eb6fdd0e4',
  group_entry: document.getElementsByName('group_entry'),
  cat_id: function() {
    return (
      document.getElementsByName('group_entry')[0].getAttribute('cat_id') || 0
    );
  },
  dvd_user_id: function() {
    return (
      document
        .getElementsByName('group_entry')[0]
        .getAttribute('dvd_user_id') || 0
    );
  },

  /* 需要跳转的小程序路径*/
  path: 'pages/detail_from_app/index',

  /* UA识别 */
  qr_ua: navigator.userAgent,

  /* 三种环境的UA判断*/
  appDvd: function() {
    return this.qr_ua.indexOf('davdian') > 0;
  },
  appVyohui: function() {
    return this.qr_ua.indexOf('vyohui') > 0;
  },
  appBravetime: function() {
    return this.qr_ua.indexOf('bravetime') > 0;
  },

  /* 是否是app 1是APP 0 不是app*/
  isApp: function() {
    return this.appDvd() || this.appVyohui() || this.appBravetime() ? 1 : 0;
  },

  /* app版本*/
  appBrand: function() {
    if (this.isApp()) {
      return (
        /(ios|android)(?:\.box)?\.(davdian\.com|vyohui\.cn|bravetime\.net)\/([\d\.]+)/.exec(
          this.qr_ua
        )[3] || ''
      );
    }
    return '';
  },

  /* 对比版本号函数*/
  compareVersion: function(v1, v2) {
    let subV1Arr = v1.split('.'),
      subV2Arr = v2.split('.'),
      length =
      subV1Arr.length >= subV2Arr.length ? subV1Arr.length : subV2Arr.length;
    for (let i = 0; i < length; i++) {
      let subV1 = (subV1Arr[i] || 0) * 1,
        subV2 = (subV2Arr[i] || 0) * 1;
      if (subV1 > subV2) {
        return 1;
      } else if (subV1 < subV2) {
        return -1;
      }
    }
    return 0;
  },

  /* 需要唤起小程序*/
  miniApp: function() {
    if (this.isApp) {
      if (this.compareVersion(this.appBrand(), '5.8.0') >= 0) {
        return 1;
      }
      return 0;
    }
    return 0;
  },

  /* 环境host*/
  host: function() {
    let urlList = location.host.split('.');
    return 'qt.' + urlList[1] + '.' + urlList[2];
  },

  /* 添加链接*/
  addHref: function() {
    let that = this,
      miniapp = that.miniApp(),
      path,
      parms = {
        cat_id: that.cat_id(),
        dvd_user_id: that.dvd_user_id(),
        is_app: miniapp
      },
      sign = that.getSign(parms);
    if (miniapp) {
      let parmms = {
        programId: that.programId,
        path: that.path +
          '?sign=' +
          sign +
          '&cat_id=' +
          parms.cat_id +
          '&is_app=' +
          miniapp +
          '&dvd_user_id=' +
          parms.dvd_user_id
      };
      path =
        'davdian://call.Common.com?action=openWXMiniProgram&params=' +
        encodeURIComponent(JSON.stringify(parmms)) +
        '&callback=native_callback_6579554950973983&minv=5.8.0';
    } else {
      path =
        'https://' + that.host() + '/index/GroupJoin/join?sign=' +
        sign +
        '&cat_id=' +
        parms.cat_id +
        '&is_app=' +
        miniapp +
        '&dvd_user_id=' +
        parms.dvd_user_id;
    }
    document.getElementsByName('group_entry')[0].href = path;
    document.getElementsByName('group_entry')[0].children[0].style.width =
      '100%';

    /* 如果链接已经存在，则不再监听dom变化*/
    if (document.getElementsByName('group_entry')[0].href) {
      that.observer().disconnect();
    }
  },
  MutationObserver: window.MutationObserver || window.WebKitMutationObserver,
  MutationObserverConfig: {
    childList: true,
    subtree: true,
    characterData: true
  },

  /* 监听文档变动*/
  observer: function() {
    let that = this;
    return new that.MutationObserver(function() {
      console.log('文档变动');
      if (document.getElementsByName('group_entry').length) {
        that.addHref();
      }
    });
  },

  /* 触发监听*/
  init: function() {
    this.observer().observe(document, this.MutationObserverConfig);
  },
  app_key: 'dvd_group_tool_miniapp',

  /* 获取签名 */
  getSign: function(params, kAppKey = this.app_key) {
    let that = this;
    if (typeof params === 'string') {
      return that.paramsStrSort(params, kAppKey);
    } else if (typeof params === 'object') {
      let arr = [];
      for (let i in params) {
        let value = params[i];
        if (typeof value === 'string') {
          value = value.replace(
            /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
            ''
          );
        }
        arr.push(i + '=' + value);
      }
      return that.paramsStrSort(arr.join('&'), kAppKey);
    }
  },
  paramsStrSort: function(paramsStr, kAppKey) {
    let urlStr = paramsStr
        .split('&')
        .sort()
        .join('&'),
      newUrl = urlStr + '&key=' + kAppKey;
    console.log(newUrl);
    return this.md5(newUrl);
  },
  md5: function(string) {
    let that = this,
      x = Array(),
      k,
      AA,
      BB,
      CC,
      DD,
      a,
      b,
      c,
      d,
      S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22,
      S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20,
      S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23,
      S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;
    string = that.uTF8Encode(string);
    x = that.convertToWordArray(string);
    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = that.FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
      d = that.FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
      c = that.FF(c, d, a, b, x[k + 2], S13, 0x242070db);
      b = that.FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
      a = that.FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
      d = that.FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
      c = that.FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
      b = that.FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
      a = that.FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
      d = that.FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
      c = that.FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
      b = that.FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
      a = that.FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
      d = that.FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
      c = that.FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
      b = that.FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
      a = that.GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
      d = that.GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
      c = that.GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
      b = that.GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
      a = that.GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
      d = that.GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = that.GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
      b = that.GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
      a = that.GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
      d = that.GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
      c = that.GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
      b = that.GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
      a = that.GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
      d = that.GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
      c = that.GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
      b = that.GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
      a = that.HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
      d = that.HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
      c = that.HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
      b = that.HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
      a = that.HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
      d = that.HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
      c = that.HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
      b = that.HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
      a = that.HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
      d = that.HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
      c = that.HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
      b = that.HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
      a = that.HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
      d = that.HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
      c = that.HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
      b = that.HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
      a = that.II(a, b, c, d, x[k + 0], S41, 0xf4292244);
      d = that.II(d, a, b, c, x[k + 7], S42, 0x432aff97);
      c = that.II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
      b = that.II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
      a = that.II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
      d = that.II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
      c = that.II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
      b = that.II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
      a = that.II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
      d = that.II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
      c = that.II(c, d, a, b, x[k + 6], S43, 0xa3014314);
      b = that.II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
      a = that.II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
      d = that.II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
      c = that.II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
      b = that.II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
      a = that.addUnsigned(a, AA);
      b = that.addUnsigned(b, BB);
      c = that.addUnsigned(c, CC);
      d = that.addUnsigned(d, DD);
    }
    const tempValue =
      that.wordToHex(a) +
      that.wordToHex(b) +
      that.wordToHex(c) +
      that.wordToHex(d);
    return tempValue.toLowerCase();
  },

  rotateLeft: function(lValue, iShiftBits) {
    return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
  },

  addUnsigned: function(lX, lY) {
    let lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) {
      return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      } else {
        return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      }
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  },

  F: function(x, y, z) {
    return x & y | ~x & z;
  },

  G: function(x, y, z) {
    return x & z | y & ~z;
  },

  H: function(x, y, z) {
    return x ^ y ^ z;
  },

  I: function(x, y, z) {
    return y ^ (x | ~z);
  },

  FF: function(a, b, c, d, x, s, ac) {
    a = this.addUnsigned(
      a,
      this.addUnsigned(this.addUnsigned(this.F(b, c, d), x), ac)
    );
    return this.addUnsigned(this.rotateLeft(a, s), b);
  },

  GG: function(a, b, c, d, x, s, ac) {
    a = this.addUnsigned(
      a,
      this.addUnsigned(this.addUnsigned(this.G(b, c, d), x), ac)
    );
    return this.addUnsigned(this.rotateLeft(a, s), b);
  },

  HH: function(a, b, c, d, x, s, ac) {
    a = this.addUnsigned(
      a,
      this.addUnsigned(this.addUnsigned(this.H(b, c, d), x), ac)
    );
    return this.addUnsigned(this.rotateLeft(a, s), b);
  },

  II: function(a, b, c, d, x, s, ac) {
    a = this.addUnsigned(
      a,
      this.addUnsigned(this.addUnsigned(this.I(b, c, d), x), ac)
    );
    return this.addUnsigned(this.rotateLeft(a, s), b);
  },

  convertToWordArray: function(string) {
    let lWordCount,
      lMessageLength = string.length,
      lNumberOfWordsTempOne = lMessageLength + 8,
      lNumberOfWordsTempTwo =
      (lNumberOfWordsTempOne - lNumberOfWordsTempOne % 64) / 64,
      lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16,
      lWordArray = Array(lNumberOfWords - 1),
      lBytePosition = 0,
      lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - lByteCount % 4) / 4;
      lBytePosition = lByteCount % 4 * 8;
      lWordArray[lWordCount] =
        lWordArray[lWordCount] |
        string.charCodeAt(lByteCount) << lBytePosition;
      lByteCount++;
    }
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  },
  wordToHex: function(lValue) {
    let WordToHexValue = '',
      WordToHexValueTemp = '',
      lByte,
      lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = lValue >>> lCount * 8 & 255;
      WordToHexValueTemp = '0' + lByte.toString(16);
      WordToHexValue =
        WordToHexValue +
        WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
    }
    return WordToHexValue;
  },
  uTF8Encode: function(string) {
    string = string.replace(/\x0d\x0a/g, '\x0a');
    let output = '';
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
      if (c < 128) {
        output += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        output += String.fromCharCode(c >> 6 | 192);
        output += String.fromCharCode(c & 63 | 128);
      } else {
        output += String.fromCharCode(c >> 12 | 224);
        output += String.fromCharCode(c >> 6 & 63 | 128);
        output += String.fromCharCode(c & 63 | 128);
      }
    }
    return output;
  }
};
window.onload = function() {
  if (document.getElementsByName('group_entry').length) {
    try {
      groupEntryData.addHref();
    } catch (err) {
      console.error('群管理工具出错');
    }
  } else {
    try {
      groupEntryData.init();
    } catch (err) {
      console.error('群管理工具出错');
    }
  }
};
