// =====================================================================
// UniVenture — Đăng ký Buổi học thử 1-1 Gia Sư
// =====================================================================
// HƯỚNG DẪN PASTE:
//   1. Mở Google Apps Script project của bạn (gia sư)
//   2. Xoá toàn bộ code cũ trong file Code.gs
//   3. Copy TOÀN BỘ nội dung file này rồi paste vào
//   4. Bấm Save (Ctrl+S)
//   5. Bấm Deploy > New deployment > Web App
//      - Execute as: Me
//      - Who has access: Anyone
//   6. Copy URL mới và paste vào src/routes/gia-su.tsx (GOOGLE_SHEET_URL)
// =====================================================================

// ====== CONFIG — GIỮ NGUYÊN, KHÔNG SỬA ======
var SHEET_ID         = "123z-HWqai98rPeVxZ2rPZRPIJ4x9TJLJqqv8NA-GrJA";
var SHEET_NAME       = "giasu";
var ADMIN_EMAIL      = "univenture.contact@gmail.com";

// ====== HEALTH CHECK ======
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "UniVenture Trial Registration is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====== MAIN HANDLER ======
function doPost(e) {
  try {
    var payload = parsePayload_(e);

    var parentName   = payload.parentName   || payload.hoTen   || "";
    var studentGrade = payload.studentGrade || payload.lopHoc  || "";
    var subject      = payload.subject      || payload.monHoc  || "";
    var phone        = payload.phone        || payload.sdt     || "";
    var email        = payload.email        || "";
    var message      = payload.message      || payload.loiNhan || "";
    var tutorName    = payload.tutorName    || "";
    var timestamp    = new Date();

    // --- Ghi vào Sheet ---
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var headers = ["Thoi Gian", "Ho Ten Phu Huynh", "Lop Hoc", "Mon Hoc", "So Dien Thoai", "Email", "Gia Su", "Loi Nhan", "Trang Thai"];
      sheet.appendRow(headers);
      var hr = sheet.getRange(1, 1, 1, headers.length);
      hr.setBackground("#122554");
      hr.setFontColor("#FAD051");
      hr.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([timestamp, parentName, studentGrade, subject, phone, email, tutorName, message, "Moi - Chua xu ly"]);

    // --- Gửi email thông báo nội bộ ---
    notifyAdmin_(parentName, studentGrade, subject, phone, email, tutorName, message, timestamp);

    // --- Gửi email xác nhận cho phụ huynh ---
    if (email && email.indexOf("@") > -1) {
      confirmToParent_(email, parentName, tutorName, subject, studentGrade);
    }

    return jsonResponse_({ success: true, message: "Dang ky thanh cong!" });

  } catch (err) {
    console.error("doPost error:", err);
    return jsonResponse_({ success: false, error: String(err) });
  }
}

// ====== HELPERS ======
function parsePayload_(e) {
  // Try JSON body first, then fall back to form params
  if (e.postData && e.postData.contents) {
    var raw = e.postData.contents;
    // URL-encoded form
    if (e.postData.type === "application/x-www-form-urlencoded") {
      var result = {};
      raw.split("&").forEach(function(pair) {
        var parts = pair.split("=");
        if (parts.length === 2) {
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1].replace(/\+/g, " "));
        }
      });
      return result;
    }
    // Multipart FormData — GAS exposes it in e.parameter
    if (e.postData.type && e.postData.type.indexOf("multipart") > -1) {
      return e.parameter || {};
    }
    // JSON
    try { return JSON.parse(raw); } catch(x) {}
  }
  return e.parameter || {};
}

function jsonResponse_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====== ADMIN EMAIL ======
function notifyAdmin_(parentName, grade, subject, phone, email, tutorName, message, timestamp) {
  try {
    var subj = "[UniVenture] New Trial Registration: " + parentName;
    var body = "<h2 style='color:#122554;'>New 1-on-1 Trial Registration</h2>"
      + "<table style='border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;'>"
      + row_("Timestamp", String(timestamp))
      + row_("Parent Name", parentName)
      + row_("Student Grade", grade)
      + row_("Subject", subject)
      + row_("Phone", "<strong>" + phone + "</strong>")
      + row_("Email", email)
      + row_("Tutor Selected", tutorName || "Not specified")
      + row_("Message", message || "—")
      + "</table>"
      + "<br/><a href='https://docs.google.com/spreadsheets/d/" + SHEET_ID + "' style='background:#122554;color:#FAD051;padding:10px 20px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:8px;'>View Full Sheet &rarr;</a>";
    MailApp.sendEmail({ to: ADMIN_EMAIL, subject: subj, htmlBody: body, name: "UniVenture Admin" });
  } catch(err) { console.error("Admin email failed:", err); }
}

function row_(label, value) {
  return "<tr style='border-bottom:1px solid #eee;'>"
    + "<td style='padding:8px 12px;font-weight:bold;width:160px;'>" + label + "</td>"
    + "<td style='padding:8px 12px;'>" + value + "</td></tr>";
}

// ====== PARENT CONFIRMATION EMAIL ======
function confirmToParent_(toEmail, parentName, tutorName, subject, grade) {
  try {
    var subj = "[UniVenture] Confirmation: 1-on-1 Trial Session Registration";
    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"/>'
      + '<style>body{font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0;}'
      + '.w{max-width:600px;margin:30px auto;background:#fff;border:2px solid #122554;}'
      + '.h{background:#122554;padding:24px 28px;}'
      + '.b{padding:28px;color:#111;font-size:15px;line-height:1.7;}'
      + '.box{background:#f0f4ff;border-left:4px solid #122554;padding:14px 18px;margin:16px 0;}'
      + '.f{background:#122554;padding:16px 28px;color:#ffffffaa;font-size:12px;text-align:center;}'
      + '</style></head><body>'
      + '<div class="w"><div class="h">'
      + '<div style="color:#FAD051;font-size:22px;font-weight:bold;">Uni<span style="color:#fff;">Venture</span></div>'
      + '<p style="color:#fff;margin:8px 0 0;font-size:15px;">1-on-1 Trial Session — Booking Confirmed</p>'
      + '</div><div class="b">'
      + '<p>Dear <strong>' + parentName + '</strong>,</p>'
      + '<p>We have received your request for a <strong>1-on-1 trial session</strong>. Our team will reach out within <strong>24 hours</strong> to confirm the schedule.</p>'
      + '<div class="box"><p style="margin:0;"><strong>Subject:</strong> ' + subject + '<br/>'
      + '<strong>Grade:</strong> ' + grade + '</p></div>'
      + '<hr style="border:none;border-top:1px solid #ddd;margin:20px 0;"/>'
      + '<p style="color:#666;font-size:13px;">Questions? Contact us:<br/>'
      + 'Phone: <strong>081-911-3388</strong><br/>'
      + 'Email: <a href="mailto:univenture.contact@gmail.com">univenture.contact@gmail.com</a></p>'
      + '</div><div class="f">&copy; 2025 UniVenture &middot; S2.07 Vinhomes Ocean Park, Gia Lam, Ha Noi</div>'
      + '</div></body></html>';
    MailApp.sendEmail({ to: toEmail, subject: subj, htmlBody: html, name: "UniVenture" });
  } catch(err) { console.error("Confirmation email failed:", err); }
}
