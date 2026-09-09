import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BookOpen, Download, Lock, ChevronDown, ChevronUp, ArrowRight, Loader2 } from "lucide-react";
import { getStoredPosts, ResourcePost, DEFAULT_POSTS } from "@/lib/admin-store";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/thu-vien")({
  head: () => ({
    meta: [
      { title: "Thư viện Resources — UniVenture" },
      { name: "description", content: "Kho tài liệu, bài viết và biểu mẫu độc quyền từ UniVenture." },
    ],
  }),
  component: LibraryPage,
});

// Google Sheets Web App URL — replace with your actual deployed URL
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwhsATl72yfBAtgwqILwfB3CGaeInwvg1z36YryVdboDS_0Sr7CyGiMPiSGIWdPm8S9Zw/exec"; // Thu vien script


const parts = [
  {
    id: 1,
    title: "Phần 1",
    subtitle: "Tư duy & Định hướng bản thân",
    desc: "Trả lời câu hỏi 'Có nên đi du học không?' và hiểu rõ bản thân.",
    status: "available",
  },
  {
    id: 2,
    title: "Phần 2",
    subtitle: "Chọn ngành & Bản đồ tài nguyên",
    desc: "Đập tan định kiến 'ngành hot', phân tích chuyên sâu từng nhóm ngành.",
    status: "available",
  },
  {
    id: 3,
    title: "Phần 3",
    subtitle: "Bản đồ Du học & Lựa chọn Trường",
    desc: "So sánh thực tế giữa các quốc gia, thoát bẫy 'chỉ nhìn vào Ranking'.",
    status: "coming_soon",
  },
  {
    id: 4,
    title: "Phần 4",
    subtitle: "Tài chính & Giải mã Học bổng",
    desc: "Cái nhìn thực tế về chi phí, học bổng và các khoản hỗ trợ.",
    status: "coming_soon",
  },
  {
    id: 5,
    title: "Phần 5",
    subtitle: "Xây dựng Hồ sơ từ Cấp 3",
    desc: "Lộ trình chuẩn bị các mảnh ghép trong hồ sơ theo từng năm học.",
    status: "coming_soon",
  },
  {
    id: 6,
    title: "Phần 6",
    subtitle: "Viết Luận, LOR & Nộp Hồ sơ",
    desc: "Hướng dẫn thực thi giai đoạn cuối cùng để nộp đơn thành công.",
    status: "coming_soon",
  },
];

const posts = [
  {
    id: 1,
    partId: 1,
    title: "Bài 1. 4 Yếu tố quyết định bạn đã sẵn sàng đi du học chưa?",
    desc: "Phân tích Tiếng Anh, Định hướng nghề nghiệp, Khả năng tài chính, và Kỹ năng sống.",
    content: `Khi bàn tới du học, có lẽ điều đầu tiên mà đa số các bạn trẻ nghĩ tới là những bức ảnh checkin rực rỡ tại các khuôn viên trường đại học cổ kính, những chuyến đi khám phá vùng đất mới, con người mới, hay những cơ hội bước ra thế giới để khẳng định bản thân.

Song, đằng sau bức tranh màu hồng đó là một thực tế đòi hỏi sự chuẩn bị kỹ lưỡng hơn rất nhiều. Du học không đơn thuần là chuyến đi để ta thay đổi không gian sống, mà là một khoản đầu tư lớn về thời gian, công sức và tài chính của cả gia đình. Để biết liệu bản thân đã thực sự sẵn sàng, hãy tự đánh giá qua **4 yếu tố cốt lõi**:

---

**1. Năng lực Ngôn ngữ**

"Chỉ cần đạt đủ điểm IELTS 6.5 là đã vừa đủ" — đó là một hiểu lầm phổ biến. Thực tế, rào cản ngôn ngữ trong môi trường học thuật quốc tế lớn hơn rất nhiều so với những bài thi chuẩn hóa. Khi bước vào giảng đường tại Mỹ, Anh hay Úc, bạn sẽ phải đọc hàng trăm trang tài liệu chuyên ngành mỗi tuần, viết bài luận nghiên cứu hàng nghìn từ và chủ động tranh luận trong các buổi thảo luận nhóm.

---

**2. Định hướng Bản thân & Ngành học**

Không ít du học sinh rơi vào trạng thái hụt hẫng vì chọn sai ngành hoặc đi du học chỉ vì FOMO. Sự sẵn sàng về định hướng đòi hỏi bạn phải trả lời được:
- Bạn thực sự có năng lực và sở thích ở lĩnh vực nào?
- Ngành học đó có phù hợp với xu hướng phát triển nghề nghiệp trong 5–10 năm tới?
- Bạn có hiểu rõ giá trị thực sự của tấm bằng sau khi tốt nghiệp?

---

**3. Năng lực Tài chính**

Một kế hoạch tài chính đầy đủ cần bao quát toàn bộ chi phí: học phí, tiền nhà, ăn uống, bảo hiểm y tế, đi lại, giáo trình. **Quy tắc vàng**: luôn dự phòng thêm ít nhất 20% tổng ngân sách để ứng phó với biến động tỷ giá, lạm phát, hoặc chi phí y tế đột xuất.

---

**4. Kỹ năng Sống & Sức khỏe Tinh thần**

Rời xa sự chăm sóc của gia đình, bạn sẽ phải tự quán xuyến tất cả: nấu ăn, giặt giũ, quản lý chi tiêu, tự chăm sóc khi ốm đau. Quan trọng hơn, sự sẵn sàng về mặt tinh thần — khả năng quản lý thời gian, giữ vững tâm lý trước áp lực — chính là chìa khóa để vượt qua giai đoạn chuyển giao này.`,
  },
  {
    id: 2,
    partId: 1,
    title: "Bài 2. Tại sao nên dùng Big Five thay vì MBTI khi chọn ngành?",
    desc: "Giới thiệu Big Five Spectrum và cách ứng dụng vào việc hiểu tính cách.",
    content: `Khi bắt đầu tìm hiểu về bản thân để chọn ngành học, hầu hết chúng ta đều tìm đến MBTI. Tuy nhiên, dưới góc độ tâm lý học học thuật và tư vấn hướng nghiệp, MBTI có nhiều hạn chế lớn trong việc dự đoán sự thành công nghề nghiệp. UniVenture đề xuất mô hình **Big Five (OCEAN)** — được các nhà nghiên cứu và hội đồng tuyển dụng toàn cầu tin tưởng.

---

**Bẫy "nhãn dán" của MBTI**

MBTI phân loại nhị nguyên — hoặc A hoặc B. Nếu bạn đạt 51% Hướng ngoại và 49% Hướng nội, MBTI vẫn xếp bạn vào nhóm Hướng ngoại, làm mất đi phần tính cách hướng nội chiếm gần một nửa con người bạn.

Big Five tiếp cận tính cách theo **dải phổ (Spectrum)**, phản ánh chính xác bức tranh tâm lý phức tạp của mỗi cá nhân.

---

**Giải mã 5 trục tính cách Big Five trong chọn ngành:**

- **O — Openness (Cởi mở):** Cao → Nghiên cứu khoa học, Thiết kế, Công nghệ đổi mới. Thấp → Kế toán, Kiểm toán, Quản trị vận hành.

- **C — Conscientiousness (Tận tụy):** Cao → Y khoa, Luật, Kỹ thuật phần mềm, Tài chính đầu tư. Thấp → Truyền thông, Marketing, Khởi nghiệp.

- **E — Extraversion (Hướng ngoại):** Cao → Du lịch, Bán hàng, PR. Thấp (Hướng nội) → Data Analytics, Khoa học máy tính, Lập trình.

- **A — Agreeableness (Hòa đồng):** Cao → Tâm lý học, Công tác xã hội, Giáo dục. Thấp → Luật sư tranh tụng, Phân tích rủi ro.

- **N — Neuroticism (Nhạy cảm cảm xúc):** Cao → Chọn môi trường cân bằng hơn. Thấp → Lãnh đạo trong môi trường đầy biến động.`,
  },
  {
    id: 3,
    partId: 1,
    title: "Bài 3. Ứng dụng Career Clusters Framework để tìm ngành học 'chân truyền'",
    desc: "Phân tích 3 yếu tố: Năng lực tự nhiên, Sở thích thật sự và Hoạt động ngoại khóa.",
    content: `Đứng trước hàng ngàn lựa chọn ngành nghề, hệ thống **Career Clusters Framework** được thiết kế như một tấm bản đồ định vị hiệu quả. Thay vì tìm ngành đơn lẻ, hệ thống này kết hợp các nghề nghiệp có chung tính chất thành **16 nhóm lớn**.

Để biết bạn thuộc về nơi nào, cần đặt bản thân vào 3 yếu tố cốt lõi:

---

**1. Năng lực tự nhiên (Natural Aptitude)**

Bạn làm tốt điều gì mà không cần quá gồng mình? Đây không chỉ là điểm số GPA, mà là những thế mạnh bộc lộ vô thức trong quá trình học tập và giải quyết vấn đề.

Tự hỏi: *Khi làm việc nhóm, bạn thường được giao vai trò gì — người lên ý tưởng, người phản biện, hay người tổng hợp tài liệu?*

---

**2. Sở thích thật sự (True Passion)**

Rất nhiều bạn nhầm lẫn giữa "sở thích" và "đam mê". Thích lướt TikTok không có nghĩa là bạn hợp với ngành Digital Marketing. Sở thích thật sự phải đi liền với những **giá trị bạn quan tâm** và khát khao tạo ra sự thay đổi.

---

**3. Hoạt động ngoại khóa (Extracurricular Activities)**

Đây là phép thử của thực tế — không phải để làm đẹp hồ sơ, mà để kiểm chứng xem năng lực và sở thích có thực sự ăn khớp nhau không.

| Yếu tố | Câu hỏi tự vấn | Ví dụ |
|---|---|---|
| Năng lực tự nhiên | Tôi làm tốt nhất việc gì? | Viết lách mạch lạc, tổng hợp thông tin |
| Sở thích | Vấn đề nào khiến tôi đào sâu tìm hiểu? | Bất bình đẳng xã hội, quyền con người |
| Hoạt động | Tôi đã chứng minh điều đó qua dự án nào? | Ban nội dung trại hè xã hội |
| Kết luận | Sự giao thoa là gì? | Giáo dục, Luật Quốc tế |`,
  },
  {
    id: 4,
    partId: 1,
    title: "Bài 4. Nghệ thuật Networking: Cách kết nối với các anh chị đi trước",
    desc: "Quy trình 4 bước kèm mẫu tin nhắn/email kết nối.",
    content: `Nhắc đến *Networking*, khái niệm này thường mang lại cảm giác ngần ngại — sợ làm phiền, sợ bị từ chối. Tuy nhiên, trò chuyện với các anh chị du học sinh đi trước là một trong những phương pháp hiệu quả nhất để có cái nhìn thực tế.

---

**Quy trình 4 bước Networking:**

**Bước 1: Xác định đúng người (Targeting)**
Tìm những cá nhân đang học đúng ngành, đúng trường hoặc từng tham gia các hoạt động bạn đang hướng tới. Tận dụng mạng lưới bạn bè, LinkedIn, các nhóm Facebook chuyên ngành.

**Bước 2: Gửi thông điệp ngắn gọn (Outreach)**
Lời chào đầu tiên cần: giới thiệu bản thân → lý do biết đến họ → lý do muốn kết nối → đề xuất gặp mặt kèm chủ đề.
*Tránh tuyệt đối*: tin nhắn cụt lủn kiểu "Chị ơi, cho em hỏi một câu được không?"

**Bước 3: Chuẩn bị trước khi gặp (Preparation)**
Nghiên cứu kỹ background trên LinkedIn. Chuẩn bị danh sách câu hỏi cụ thể về góc nhìn và trải nghiệm cá nhân của họ — không hỏi những gì đã có trên Google.

**Bước 4: Duy trì mối quan hệ (Follow-up)**
Gửi tin nhắn/email cảm ơn ngay sau buổi nói chuyện. Cập nhật tiến độ hồ sơ của bạn cho họ biết.

---

**Mẫu email kết nối:**

> **Tiêu đề:** Học sinh cấp 3 xin kinh nghiệm ứng tuyển [Tên Trại Hè]
>
> *Dạ em chào anh/chị, em là [Tên], hiện đang học lớp [Lớp]. Em có theo dõi hành trình của anh/chị và rất ấn tượng với những dự án cộng đồng anh/chị đã thực hiện.*
>
> *Hiện tại, em đang hoàn thiện hồ sơ ứng tuyển cho trại hè [Tên Trại Hè] mùa tới. Nếu anh/chị có khoảng 15–20 phút rảnh vào cuối tuần này, em rất mong được kết nối qua Google Meet để lắng nghe những chia sẻ từ trải nghiệm đi trước của anh/chị.*
>
> *Em cảm ơn anh/chị rất nhiều!*`,
  },
  {
    id: 5,
    partId: 2,
    title: "Bài 5. Sự thật về việc chọn ngành du học",
    desc: "Phân tích ngành STEM, Data Science, và các ngành nên cân nhắc học tại VN.",
    content: `Một trong những câu hỏi phổ biến nhất là: *"Năm nay ngành nào đang hot, xin việc và có mức lương cao?"* — Tư duy này là biểu hiện điển hình của tâm lý FOMO.

**Sự thật**: Không có ngành học nào đảm bảo cho bạn sự nghiệp thành công nếu bản thân không có năng lực cốt lõi.

---

**1. Góc khuất của khối ngành STEM & Dữ liệu**

Ngành Data Science và Business Analytics hấp dẫn vì mức lương khởi điểm cao và chính sách STEM OPT kéo dài 3 năm tại Mỹ. Tuy nhiên, mức độ **cạnh tranh khốc liệt** và sự đào thải khắc nghiệt là thực tế ít ai nhắc tới.

Nếu bạn chọn Data Science chỉ vì nghe nói lương cao, nhưng lại chật vật với thống kê và lập trình, bạn sẽ rất dễ chìm nghỉm giữa hàng ngàn sinh viên quốc tế xuất chúng.

---

**2. Những ngành nên cân nhắc học tại Việt Nam:**

| Ngành | Khó khăn khi du học | Lợi thế học tại VN |
|---|---|---|
| Luật | Hệ thống pháp luật mỗi nước khác nhau | Nắm vững luật sở tại, xây mạng lưới quan hệ |
| Y khoa | Chi phí khổng lồ, rào cản giấy phép hành nghề | Chi phí hợp lý, thực hành lâm sàng với bệnh lý VN |
| Chính trị | Đòi hỏi hiểu biết sâu về văn hóa địa phương | Cơ hội việc làm trong bộ máy nhà nước |

---

**3. Chiến lược khôn ngoan: Trở thành "người giỏi" thay vì tìm "ngành hot"**

Kỹ năng công nghệ ngày hôm nay có thể bị AI thay thế trong 5 năm tới. Chiến lược tối ưu là trang bị **bộ kỹ năng chuyển đổi**: tư duy phản biện, giải quyết vấn đề phức tạp, năng lực tự học.

Thị trường lao động luôn ưu ái top 10% của bất kỳ ngành nghề nào, hơn là những cá nhân trung bình của ngành đang dẫn đầu.`,
  },
  {
    id: 6,
    partId: 2,
    title: "Bài 6. Phân tích 5 nhóm ngành: Công nghệ, Kinh doanh, Sức khỏe, Nghiên cứu & Nghệ thuật",
    desc: "Đặc điểm từng ngành và những lưu ý bắt buộc khi chọn.",
    content: `Sau khi hiểu rõ chính mình, bước tiếp theo là tìm hiểu kỹ về ngành học để xem bản thân có thực sự phù hợp không.

---

**1. Công nghệ & Khoa học Máy tính**

Giá trị cốt lõi nằm ở **tư duy logic** và khả năng ứng dụng công nghệ để giải quyết bài toán vĩ mô. Đòi hỏi khả năng học tập liên tục trước tốc độ cập nhật chóng mặt của AI. Nếu có nền tảng toán học vững, hãy triển khai dự án cá nhân sớm nhất có thể.

---

**2. Kinh doanh & Quản lý**

Sai lầm phổ biến: chọn ngành Quản trị kinh doanh *chung*. Chiến lược tối ưu: chọn chuyên ngành hẹp như **Tài chính định lượng**, **Business Analytics**, hoặc **Quản trị Chuỗi cung ứng**.

---

**3. Sức khỏe & Y tế**

Đòi hỏi sự tận tụy tuyệt đối và thời gian cam kết dài hạn. Tại Mỹ: bắt buộc hoàn thành 4 năm dự bị y khoa trước khi vào trường y. Các lộ trình khả thi hơn: Điều dưỡng, Khoa học Y sinh, Y tế Công cộng.

---

**4. Nghiên cứu Khoa học & Xã hội**

Trọng tâm là **phương pháp luận nghiên cứu** và năng lực đọc viết học thuật cường độ cao. Môi trường tuyệt vời để hiện thực hóa những trăn trở cá nhân về xã hội.

---

**5. Nghệ thuật & Thiết kế**

Hồ sơ năng lực nghệ thuật quan trọng hơn GPA. Sự giao thoa giữa nghệ thuật và công nghệ mở ra hướng đi triển vọng: UX Design, truyền thông đa phương tiện, thiết kế công nghiệp.

| Phân loại | Điểm mạnh | Thử thách |
|---|---|---|
| Công nghệ | Tư duy logic, cập nhật liên tục | Tốc độ thay đổi nhanh, cạnh tranh cao |
| Kinh doanh | Kỹ năng giao tiếp, tư duy chiến lược | Nguy cơ thiếu chuyên môn sâu |
| Sức khỏe | Kỷ luật, sức chịu đựng bền bỉ | Lộ trình dài, chi phí đắt |
| Nghiên cứu | Tư duy phản biện đa chiều | Cần năng lực ngoại ngữ chuyên sâu |
| Nghệ thuật | Sáng tạo, tư duy thẩm mỹ | Tốn thời gian xây dựng portfolio |`,
  },
  {
    id: 7,
    partId: 2,
    title: "Bài 7. Tổng hợp 'Kho tài nguyên' tự nghiên cứu ngành nghề chuẩn quốc tế",
    desc: "Giới thiệu Vault Career Guide, Subreddit chuyên ngành, YouTube và các trang tra cứu.",
    content: `Khi đã xác định được nhóm ngành phù hợp, hãy tự mình đào sâu vào thực tế thị trường lao động bằng các nền tảng tra cứu chuyên nghiệp.

---

**1. Vault Career Guide**

Nền tảng cung cấp báo cáo chi tiết về hàng trăm ngành nghề — từ một ngày làm việc điển hình đến lộ trình thăng tiến. Vault đặc biệt hữu ích để hiểu **cấu trúc của một ngành công nghiệp**: bắt đầu từ vị trí nào, cần chứng chỉ gì, mất bao nhiêu năm để lên quản lý cấp cao.

→ [Vault Career Guide](https://vault.com/vault-guides)

---

**2. Cộng đồng ngành nghề (Facebook Groups)**

- **VietTech** (công nghệ): Chia sẻ thực tế từ anh chị làm tại Microsoft, Meta
- **VietPhD** (nghiên cứu): Thảo luận về research fit, đánh giá hồ sơ Tiến sĩ
- **Vietnam Management Trainee**: Kinh nghiệm thi Aptitude Test, Digital Interview

---

**3. Reddit Subreddits theo ngành:**

*Công nghệ:* r/cscareerquestions, r/datascience, r/MachineLearning
*Tài chính:* r/consulting, r/FinancialCareers
*Y tế:* r/medicine, r/medicalschool
*Nghiên cứu:* r/academia, r/GradSchool, r/PhD
*Thiết kế:* r/UI_Design, r/graphic_design

---

**4. Glassdoor & Blind**

Đọc bản mô tả công việc (JD) là phương pháp nghiên cứu ngược hiệu quả: JD chỉ ra thị trường đang cần kỹ năng gì, từ đó chiếu ngược lại để chọn trường và ngành phù hợp.

---

**5. YouTube**

Tìm kiếm: *"A day in the life of a..."* để hình dung trực quan công việc thực tế.

- Kinh doanh: Good Work, Duy Thanh Nguyen
- Công nghệ: JomaTech
- Startup: Lenny's Podcast, Y Combinator
- Y tế: Doctor Mike`,
  },
];

// Simulate generating a text file for download
function generatePostBlob(post: (typeof posts)[0]): Blob {
  const content = `${post.title}\n${"=".repeat(60)}\n\n${post.desc}\n\n${"-".repeat(60)}\n\n${post.content}\n\n${"=".repeat(60)}\n\nNguồn: UniVenture — univenture.contact@gmail.com\n`;
  return new Blob([content], { type: "text/plain;charset=utf-8" });
}

function DownloadModal({
  post,
  onClose,
}: {
  post: (typeof posts)[0];
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Send via POST with FormData exactly like gia-su
      // We ONLY send tracking info (email, phone, title, part) to ensure 100% delivery success
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("postTitle", post.title);
      formData.append("postPart", post.partId.toString());

      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
      }).catch(() => { });

      // 2. Auto-download the post as a .txt file
      const blob = generatePostBlob(post);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `UniVenture - ${post.title.replace(/[^a-zA-ZÀ-ỹ0-9\s]/g, "").trim()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-md border-2 border-[#122554] shadow-2xl">
        {/* Header */}
        <div className="bg-[#122554] text-white px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#ffcd6b] mb-1">Tải xuống tài liệu</p>
            <h3 className="font-display font-bold text-base leading-snug">{post.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-white/60 hover:text-white transition-colors text-xl leading-none mt-0.5"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {status === "done" ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#ffcd6b] flex items-center justify-center mx-auto mb-4">
                <Download className="h-7 w-7 text-[#122554]" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#122554] mb-2">Tải xuống thành công!</h4>
              <p className="text-sm text-gray-500 mb-5">
                File đã được tải về thiết bị của bạn. Chúng tôi sẽ gửi thêm tài liệu qua email của bạn sớm nhé!
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#122554] text-white font-medium hover:bg-black transition-colors"
              >
                Đóng
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-5">
                Nhập thông tin để tải xuống ngay và nhận thêm tài liệu qua email.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#122554] font-semibold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full border-2 border-[#122554]/30 px-4 py-3 text-sm focus:border-[#122554] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#122554] font-semibold mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0987654321"
                    className="w-full border-2 border-[#122554]/30 px-4 py-3 text-sm focus:border-[#122554] focus:outline-none transition-colors"
                  />
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-500">Có lỗi xảy ra. Vui lòng thử lại.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#122554] text-white py-3.5 font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Đang tải xuống...</>
                  ) : (
                    <><Download className="h-4 w-4" /> Xác nhận & Tải xuống ngay</>
                  )}
                </button>
                <p className="text-xs text-center text-gray-400">
                  Chúng tôi không spam. Thông tin chỉ dùng để gửi tài liệu liên quan.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: (typeof posts)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const PREVIEW_CHARS = 400;
  const isLong = post.content.length > PREVIEW_CHARS;
  const getPreview = (content: string) => {
    if (content.length <= PREVIEW_CHARS) return content;
    const truncated = content.slice(0, PREVIEW_CHARS);
    const lastNewline = truncated.lastIndexOf('\n');
    if (lastNewline > PREVIEW_CHARS * 0.6) return truncated.slice(0, lastNewline) + "…";
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.slice(0, lastSpace > 0 ? lastSpace : PREVIEW_CHARS) + "…";
  };
  const preview = !expanded ? getPreview(post.content) : post.content;

  return (
    <>
      <div className="border-2 border-[#122554] bg-white flex flex-col transition-shadow hover:shadow-lg">
        {/* Card header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#122554]/10">
          <div className="flex items-start gap-3 mb-3">
            <BookOpen className="h-5 w-5 text-[#122554] shrink-0 mt-0.5" />
            <h3 className="font-display font-bold text-base leading-snug text-[#122554]">{post.title}</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{post.desc}</p>
        </div>

        <div className="px-6 py-4 flex-1">
          <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-a:text-[#122554] prose-a:font-semibold hover:prose-a:text-[#ffcd6b] prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-[#122554]/30 prose-th:bg-[#122554] prose-th:text-white prose-th:text-xs prose-th:px-3 prose-th:py-2 prose-td:border prose-td:border-[#122554]/20 prose-td:px-3 prose-td:py-2 prose-td:text-sm prose-headings:text-[#122554] prose-headings:font-bold prose-li:my-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview}</ReactMarkdown>
          </div>
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#122554] hover:text-[#ffcd6b] transition-colors"
            >
              {expanded ? (
                <><ChevronUp className="h-4 w-4" /> Thu gọn</>
              ) : (
                <><ChevronDown className="h-4 w-4" /> Đọc thêm</>
              )}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 pt-3 border-t border-[#122554]/10">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-[#122554] text-white px-5 py-2.5 text-sm font-semibold hover:bg-black transition-colors group cursor-pointer"
          >
            <Download className="h-4 w-4 text-[#ffcd6b] group-hover:animate-bounce" />
            Tải về dạng file
          </button>
        </div>
      </div>

      {showModal && <DownloadModal post={post} onClose={() => setShowModal(false)} />}
    </>
  );
}

function LibraryPage() {
  const [posts, setPosts] = useState<ResourcePost[]>(DEFAULT_POSTS);
  const [activePart, setActivePart] = useState(1);

  useEffect(() => {
    setPosts(getStoredPosts());
  }, []);

  const currentPosts = posts.filter((p) => p.partId === activePart);
  const selectedPart = parts.find((p) => p.id === activePart);
  if (!selectedPart) return null;
  const hasPosts = currentPosts.length > 0;

  return (
    <>
      {/* Page hero */}
      <section className="bg-[#122554] text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:py-20">
          <p className="eyebrow text-[#ffcd6b] mb-3">Resources</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl max-w-2xl">Thư viện Tài liệu</h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75 text-base">
            Kho bài viết chuyên sâu và tài liệu độc quyền do đội ngũ UniVenture biên soạn — giúp bạn chuẩn bị tốt nhất cho hành trình du học.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12 lg:py-16">
        {/* Parts tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {parts.map((p) => {
            const isAvailable = p.status === "available" || posts.some((item) => item.partId === p.id);
            return (
              <button
                key={p.id}
                onClick={() => {
                  if (isAvailable) setActivePart(p.id);
                }}
                disabled={!isAvailable}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-2 cursor-pointer ${activePart === p.id
                  ? "bg-[#122554] text-white border-[#122554]"
                  : isAvailable
                    ? "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
                    : "bg-white text-gray-300 border-gray-200 cursor-not-allowed"
                  }`}
              >
                {!isAvailable && <Lock className="h-3.5 w-3.5" />}
                {p.title}
                {!isAvailable && <span className="text-xs font-normal opacity-70">Sắp ra mắt</span>}
              </button>
            );
          })}
        </div>

        {/* Current part header */}
        <div className="mb-8 pb-5 border-b-2 border-[#122554]">
          <h2 className="font-display font-bold text-2xl text-[#122554]">
            {selectedPart.title}: {selectedPart.subtitle}
          </h2>
          <p className="mt-1.5 text-sm text-gray-500">{selectedPart.desc}</p>
        </div>

        {/* Posts */}
        {!hasPosts ? (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-none">
            <Lock className="h-10 w-10 mx-auto text-gray-300 mb-4" />
            <h3 className="font-display font-bold text-xl text-gray-400 mb-2">Nội dung đang được cập nhật</h3>
            <p className="text-sm text-gray-400 max-w-sm mx-auto">
              Các bài viết trong phần này đang được đội ngũ UniVenture hoàn thiện và sẽ sớm ra mắt.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Upsell */}
        <div className="mt-14 border-2 border-[#122554] bg-[#122554] text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="eyebrow text-[#ffcd6b] mb-2">Cần hỗ trợ cá nhân hoá?</p>
            <h3 className="font-display font-bold text-2xl">Đặt lịch tư vấn 1-1 cùng Mentor</h3>
            <p className="mt-2 text-white/70 text-sm max-w-md">
              Mentor UniVenture sẽ phân tích hồ sơ và lộ trình phù hợp nhất với mục tiêu của bạn.
            </p>
          </div>
          <a
            href="/lien-he"
            className="inline-flex items-center gap-2 bg-white text-[#122554] border-2 border-white px-6 py-3 font-semibold hover:bg-[#122554] hover:text-white transition-colors shrink-0"
          >
            Đặt lịch ngay <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
}
