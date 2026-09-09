// =====================================================================
// UniVenture — Thư viện Tải tài liệu (PURE TRACKER)
// =====================================================================
// HƯỚNG DẪN PASTE:
//   1. Xoá TOÀN BỘ code cũ
//   2. Copy TOÀN BỘ nội dung file này rồi paste vào
//   3. Bấm Save (Ctrl+S)
//   4. Bấm Deploy > New deployment > Web App
//      - Execute as: Me
//      - Who has access: Anyone
//   5. Copy URL mới và paste vào src/routes/thu-vien.tsx
// =====================================================================

var SHEET_ID    = "1EHvp4VXc0Z4J3d_nh0S3W7ZGbDZscECpS3CT9-Ix5X0";
var SHEET_NAME  = "thuvien";

// ====== HEALTH CHECK ======
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "UniVenture Library Tracker is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====== MAIN HANDLER ======
function doPost(e) {
  try {
    var payload = parsePayload_(e);

    var email     = payload.email     || "";
    var phone     = payload.phone     || payload.sdt || "";
    var postTitle = payload.postTitle || payload.title || payload.article || "";
    var postPart  = payload.postPart  || "";
    var timestamp = new Date();

    // --- Ghi vào Sheet ---
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var headers = ["Thoi Gian", "Email", "So Dien Thoai", "Ten Tai Lieu", "Phan", "Nguon"];
      sheet.appendRow(headers);
      var hr = sheet.getRange(1, 1, 1, headers.length);
      hr.setBackground("#122554");
      hr.setFontColor("#FAD051");
      hr.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([timestamp, email, phone, postTitle, postPart ? "Phan " + postPart : "", "Website"]);

    return jsonResponse_({ success: true, message: "Da ghi nhan thanh cong" });

  } catch (err) {
    console.error("doPost error:", err);
    return jsonResponse_({ success: false, error: String(err) });
  }
}

// ====== HELPERS ======
function parsePayload_(e) {
  if (e.postData && e.postData.contents) {
    var raw = e.postData.contents;
    if (e.postData.type === "application/x-www-form-urlencoded") {
      var result = {};
      raw.split("&").forEach(function(pair) {
        var parts = pair.split("=");
        if (parts.length >= 2) {
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts.slice(1).join("=").replace(/\+/g, " "));
        }
      });
      return result;
    }
    if (e.postData.type && e.postData.type.indexOf("multipart") > -1) {
      return e.parameter || {};
    }
    try { return JSON.parse(raw); } catch(x) {}
  }
  return e.parameter || {};
}

function jsonResponse_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
