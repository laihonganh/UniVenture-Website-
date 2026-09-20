// Admin Store with localStorage persistence for Tutors and Library Resources

export interface TutorItem {
  id: number;
  name: string;
  role: string;
  image: string;
  about: string;
  classes: string[];
  academics: string[];
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}

export interface MentorItem {
  id: number;
  name: string;
  role: string;
  image: string;
  academics: string[];
  leadership: string[];
  admits: string[];
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}

export interface ResourcePost {
  id: number;
  partId: number;
  title: string;
  desc: string;
  content: string;
  fileUrl?: string;
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}

export interface AdminUser {
  email: string;
  addedAt: string;
  addedBy?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  target: string;
  details: string;
}

export interface FilterSubject {
  id: string;
  label: string;
}

export interface FilterCategory {
  id: string;
  label: string;
  subjects: FilterSubject[];
}

export const UNIFIED_ADMIN_PASSWORD = "univenture123";

export const DEFAULT_TUTORS: TutorItem[] = [
  {
    id: 1,
    name: "Trần Văn Nghĩa",
    role: "Cử nhân Kỹ thuật Cơ khí - Đại học VinUni",
    image: "/images/tutors/tutor-1-tran-van-nghia.png",
    about:
      "Tutor Trần Văn Nghĩa hướng tới giá trị giảng dạy chân thực, kết hợp các công cụ học tập trực quan để biến Vật lý thành ứng dụng thực tế; đồng thời thiết kế lộ trình cá nhân hóa giúp học sinh rèn tư duy chuẩn Lab, khắc phục triệt để lỗi sai và tự tin bứt phá điểm số.",
    classes: [
      "IGCSE Maths",
      "IGCSE Coordinated Science (Physics)",
      "AS & A Level Maths",
      "AS & A Level Physics",
    ],
    academics: [
      "Giải Ba Học sinh giỏi môn Vật lý cấp Quốc gia (2024-2025)",
      "Hai lần đạt Giải Nhất Olympic Vật lý cấp Tỉnh (2023-2024, 2024-2025)",
      "Đạt Học bổng Odon Vallet hai năm liên tiếp (2024, 2025)",
      "Nghiên cứu sinh tại VinUni Biorobotics Lab, trực tiếp chế tạo phần cứng cho găng tay robot.",
      "Trưởng nhóm Kỹ thuật Cơ khí cho dự án hệ thống giám sát chất lượng nước, phối hợp cùng nhóm kỹ sư liên ngành.",
    ],
  },
  {
    id: 2,
    name: "Nguyễn Huy Long",
    role: "Cử nhân Kỹ thuật Điện - Đại học VinUni",
    image: "/images/tutors/tutor-2-nguyen-huy-long.png",
    about:
      "Tutor Nguyễn Huy Long đề cao giá trị giảng dạy chân thực, giúp học sinh đơn giản hóa kiến thức phức tạp qua lộ trình học cá nhân hóa. Bằng sự kiên nhẫn và phương pháp bài bản đồng hành cùng bạn rèn luyện chiến thuật, khắc phục triệt để lỗi sai và tự tin bứt phá điểm số.",
    classes: [
      "IGCSE Maths",
      "AS & A Level Maths",
      "IGCSE Coordinated Science (Physics)",
      "AS & A Level Physics",
    ],
    academics: [
      "Đạt Giải Nhì kỳ thi Học sinh giỏi Vật lý Cấp Quốc gia (2023) và 3 năm liên tiếp đạt Giải Nhất Học sinh giỏi Vật lý cấp Tỉnh.",
      "Đạt danh hiệu President's List & Dean's List tại VinUniversity và 2 lần nhận Học bổng Odon Vallet danh giá.",
      "Trực tiếp đào tạo học sinh đạt thành tích xuất sắc tại kỳ thi Học sinh giỏi Vật lý cấp Quốc gia (1 Giải Nhất, 1 Giải Nhì, 1 Giải Ba, 5 Giải Khuyến khích).",
      "Dẫn dắt học sinh đạt các Huy chương Vàng, Bạc, Đồng tại kỳ thi Olympic 30/4 và kỳ thi Duyên hải Bắc Bộ.",
    ],
  },
  {
    id: 3,
    name: "Vũ Hoàng Lan",
    role: "Cử nhân Kỹ thuật Điện & Máy Tính - Đại học VinUni",
    image: "/images/tutors/tutor-3-vu-hoang-lan.png",
    about:
      "Tutor Vũ Hoàng Lan bằng các bài học tương tác kết hợp lý thuyết và thực tiễn, cùng lộ trình cá nhân hóa sát sao, kiên nhẫn đồng hành giúp học sinh rèn tư duy chuẩn Lab, khắc phục lỗi sai và bứt phá mức điểm tối đa.",
    classes: [
      "Stage 7-9, Checkpoint Science",
      "Stage 7-9, Checkpoint Maths",
      "IGCSE Maths",
      "IGCSE, AS & A Level Computer Science",
    ],
    academics: [
      "Thành tích xuất sắc hệ Cambridge A-Level: Đạt điểm A* (92) môn Toán, điểm A môn Khoa học Máy tính và Vật lý.",
      "Cố vấn team đạt thành tích cấp Quốc tế tại VEX World Championship 2024-2025 (Texas, Mỹ), Winning Alliance - Edison Division, Finalist Alliance - Championship.",
      "Đã hỗ trợ hơn 20 học sinh cải thiện thành tích học tập, trong đó hơn 80% học sinh đạt điểm A/A+.",
      "60% học sinh tăng tối đa tới 3 bậc điểm (letter grades) chỉ sau 2 tháng theo học.",
      "Nhiều năm kinh nghiệm giảng dạy môn Toán, ICT và Khoa học hệ Cambridge cho học sinh khối Y6/Y7 và làm Mentor cho các đội tuyển thi Robotics cấp Quốc tế.",
    ],
  },
  {
    id: 4,
    name: "Minh Nghĩa",
    role: "Cử nhân Kỹ thuật Cơ khí - Đại học VinUni",
    image: "/images/tutors/tutor-4-minh-nghia.png",
    about:
      "Tutor Nguyễn Minh Nghĩa đề cao giá trị giảng dạy chân thực, giúp học sinh đơn giản hóa kiến thức phức tạp qua lộ trình học cá nhân hóa. Bằng sự kiên nhẫn và phương pháp bài bản đồng hành cùng bạn rèn luyện chiến thuật, khắc phục triệt để lỗi sai và tự tin bứt phá điểm số.",
    classes: [
      "Stage 7 - 10, IGCSE Science",
      "Stage 7 - 10, IGCSE Mathematics",
      "Khoa học tự nhiên Vinschools",
    ],
    academics: [
      "Sinh viên ngành Khoa học Máy tính tại VinUniversity.",
      "Cựu học sinh THPT Chuyên Khoa học Tự nhiên (HSGS), ĐHQGHN với điểm GPA lớp 12 đạt 9.70/10.",
      "Điểm chuẩn hóa xuất sắc: SAT 1560 (Tuyệt đối 800/800 môn Toán), IELTS 8.0.",
      "Giải Nhì cuộc thi 'Khám phá và Sáng tạo Toán học' ĐHKHTN (2024), Giải Nhất Olympic Toán học cấp Quận (2022).",
      "Đạt điểm A các môn Toán cốt lõi ở bậc Đại học: Giải tích I, II và Đại số tuyến tính.",
    ],
  },
  {
    id: 5,
    name: "Bùi Minh Châu",
    role: "Cử nhân Bác sĩ Y Khoa - Đại học VinUni",
    image: "/images/tutors/tutor-5-bui-minh-chau.png",
    about:
      "Tutor Bùi Minh Châu tập trung xây dựng nền tảng logic cốt lõi và tác phong chuẩn Lab, biến kiến thức Hoá - Sinh phức tạp thành các bài học tương tác, thực tiễn. Với lộ trình cá nhân hóa và bộ tài liệu chuyên sâu, tutor rèn luyện tư duy phân tích và sự kiên trì, giúp học sinh tự tin bứt phá điểm số tối đa.",
    classes: [
      "AS & A Level Biology",
      "AS & A Level Chemistry",
      "IGCSE Coordinated Science (Chemistry)",
      "IGCSE Coordinated Science (Biology)",
    ],
    academics: [
      "Đã có 2 năm kinh nghiệm luyện thi IGCSE/AS/AP/IB.",
      "100% Học sinh đạt thành tích tốt trong IB, A Level, AP.",
      "Học bổng 90% chương trình Bác sĩ Y Khoa VinUni.",
      "Giải Nhất HSG thành phố Hà Nội môn Sinh năm lớp 11 và 12.",
      "Huy chương Đồng Duyên Hải và Đồng Bằng Bắc Bộ 2021-2022 và 2022-2023 môn Sinh học.",
      "Thành viên Đội tuyển Hà Nội thi HSG quốc gia.",
      "Thi đỗ trường Y Debrecen Hungary với kì thi đầu vào Hóa, Sinh.",
    ],
  },
  {
    id: 6,
    name: "Lưu Bảo Linh",
    role: "Học bổng toàn phần chương trình MD, VinUniversity",
    image: "/images/tutors/tutor-6-luu-bao-linh.png",
    about:
      "Tutor Lưu Bảo Linh với nền tảng Y khoa và Sinh học chuyên sâu, đồng hành cùng học sinh vượt qua các rào cản lý thuyết và bài tập Cambridge, xây dựng phương pháp học có hệ thống và đam mê thực sự với khoa học.",
    classes: [
      "IGCSE Chemistry",
      "IGCSE Biology",
      "IGCSE Coordinated Science",
    ],
    academics: [
      "Học bổng toàn phần Cử nhân Y khoa (MD) tại VinUniversity.",
      "Huy chương Bạc International Medical & Biology Competition (IMBC).",
      "Top 15 toàn cầu Inter Medical School Physiology Quiz (IMSPQ).",
    ],
  },
  {
    id: 7,
    name: "Nguyễn Khắc Đạt",
    role: "Cử nhân Kỹ thuật Cơ khí - Đại học VinUni",
    image: "/images/tutors/tutor-7-nguyen-khac-dat.png",
    about:
      "Tutor Nguyễn Khắc Đạt mang đến phương pháp giảng dạy thiên về tư duy logic và kỹ năng giải quyết vấn đề. Tận dụng thế mạnh từ nền tảng tiếng Anh thành thạo và kinh nghiệm dịch thuật chuyên sâu, Đạt có khả năng truyền đạt các khối kiến thức khoa học phức tạp một cách rõ ràng, dễ hiểu. Lộ trình học cùng tutor hướng tới việc giúp học sinh nắm vững kiến thức nền và chuẩn bị hiệu quả nhất cho các kỳ thi Cambridge.",
    classes: [
      "IGCSE Mathematics",
      "A Level Mathematics",
      "AS Level Mathematics",
    ],
    academics: [
      "3 A* A levels (Mathematics, Physics, and Chemistry).",
      "3 A* AS levels (Mathematics, Physics, and Chemistry).",
      "4/5 AP Calculus AB.",
      "IELTS 8.0.",
      "Huy chương Bạc cuộc thi Khoa học Tự nhiên COPERNICUS.",
    ],
  },
];

export const STORAGE_KEY = "univenture_posts_v4";

export const DEFAULT_POSTS: ResourcePost[] = [
  {
    "id": 1,
    "partId": 1,
    "title": "Bài 1. 4 Yếu tố quyết định bạn đã sẵn sàng đi du học chưa?",
    "desc": "Phân tích Tiếng Anh, Định hướng nghề nghiệp, Khả năng tài chính, và Kỹ năng sống.",
    "content": "Khi bàn tới du học, có lẽ điều đầu tiên mà đa số các bạn trẻ nghĩ tới là những bức ảnh checkin rực rỡ tại các khuôn viên trường đại học cổ kính, những chuyến đi khám phá vùng đất mới, con người mới, hay những cơ hội bước ra thế giới để khẳng định bản thân.\n\nSong, đằng sau bức tranh màu hồng đó là một thực tế đòi hỏi sự chuẩn bị kỹ lưỡng hơn rất nhiều. Du học không đơn thuần là chuyến đi để ta thay đổi không gian sống, mà là một khoản đầu tư lớn về thời gian, công sức và tài chính của cả gia đình. Để biết liệu bản thân đã thực sự sẵn sàng, hãy tự đánh giá qua **4 yếu tố cốt lõi**:\n\n---\n\n**1. Năng lực Ngôn ngữ**\n\n\"Chỉ cần đạt đủ điểm IELTS 6.5 là đã vừa đủ\" — đó là một hiểu lầm phổ biến. Thực tế, rào cản ngôn ngữ trong môi trường học thuật quốc tế lớn hơn rất nhiều so với những bài thi chuẩn hóa. Khi bước vào giảng đường tại Mỹ, Anh hay Úc, bạn sẽ phải đọc hàng trăm trang tài liệu chuyên ngành mỗi tuần, viết bài luận nghiên cứu hàng nghìn từ và chủ động tranh luận trong các buổi thảo luận nhóm.\n\n---\n\n**2. Định hướng Bản thân & Ngành học**\n\nKhông ít du học sinh rơi vào trạng thái hụt hẫng vì chọn sai ngành hoặc đi du học chỉ vì FOMO. Sự sẵn sàng về định hướng đòi hỏi bạn phải trả lời được:\n- Bạn thực sự có năng lực và sở thích ở lĩnh vực nào?\n- Ngành học đó có phù hợp với xu hướng phát triển nghề nghiệp trong 5–10 năm tới?\n- Bạn có hiểu rõ giá trị thực sự của tấm bằng sau khi tốt nghiệp?\n\n---\n\n**3. Năng lực Tài chính**\n\nMột kế hoạch tài chính đầy đủ cần bao quát toàn bộ chi phí: học phí, tiền nhà, ăn uống, bảo hiểm y tế, đi lại, giáo trình. **Quy tắc vàng**: luôn dự phòng thêm ít nhất 20% tổng ngân sách để ứng phó với biến động tỷ giá, lạm phát, hoặc chi phí y tế đột xuất.\n\n---\n\n**4. Kỹ năng Sống & Sức khỏe Tinh thần**\n\nRời xa sự chăm sóc của gia đình, bạn sẽ phải tự quán xuyến tất cả: nấu ăn, giặt giũ, quản lý chi tiêu, tự chăm sóc khi ốm đau. Quan trọng hơn, sự sẵn sàng về mặt tinh thần — khả năng quản lý thời gian, giữ vững tâm lý trước áp lực — chính là chìa khóa để vượt qua giai đoạn chuyển giao này."
  },
  {
    "id": 2,
    "partId": 1,
    "title": "Bài 2. Tại sao nên dùng Big Five thay vì MBTI khi chọn ngành?",
    "desc": "Giới thiệu Big Five Spectrum và cách ứng dụng vào việc hiểu tính cách.",
    "content": "Khi bắt đầu tìm hiểu về bản thân để chọn ngành học, hầu hết chúng ta đều tìm đến MBTI. Tuy nhiên, dưới góc độ tâm lý học học thuật và tư vấn hướng nghiệp, MBTI có nhiều hạn chế lớn trong việc dự đoán sự thành công nghề nghiệp. UniVenture đề xuất mô hình **Big Five (OCEAN)** — được các nhà nghiên cứu và hội đồng tuyển dụng toàn cầu tin tưởng.\n\n---\n\n**Bẫy \"nhãn dán\" của MBTI**\n\nMBTI phân loại nhị nguyên — hoặc A hoặc B. Nếu bạn đạt 51% Hướng ngoại và 49% Hướng nội, MBTI vẫn xếp bạn vào nhóm Hướng ngoại, làm mất đi phần tính cách hướng nội chiếm gần một nửa con người bạn.\n\nBig Five tiếp cận tính cách theo **dải phổ (Spectrum)**, phản ánh chính xác bức tranh tâm lý phức tạp của mỗi cá nhân.\n\n---\n\n**Giải mã 5 trục tính cách Big Five trong chọn ngành:**\n\n- **O — Openness (Cởi mở):** Cao → Nghiên cứu khoa học, Thiết kế, Công nghệ đổi mới. Thấp → Kế toán, Kiểm toán, Quản trị vận hành.\n\n- **C — Conscientiousness (Tận tụy):** Cao → Y khoa, Luật, Kỹ thuật phần mềm, Tài chính đầu tư. Thấp → Truyền thông, Marketing, Khởi nghiệp.\n\n- **E — Extraversion (Hướng ngoại):** Cao → Du lịch, Bán hàng, PR. Thấp (Hướng nội) → Data Analytics, Khoa học máy tính, Lập trình.\n\n- **A — Agreeableness (Hòa đồng):** Cao → Tâm lý học, Công tác xã hội, Giáo dục. Thấp → Luật sư tranh tụng, Phân tích rủi ro.\n\n- **N — Neuroticism (Nhạy cảm cảm xúc):** Cao → Chọn môi trường cân bằng hơn. Thấp → Lãnh đạo trong môi trường đầy biến động."
  },
  {
    "id": 3,
    "partId": 1,
    "title": "Bài 3. Ứng dụng Career Clusters Framework để tìm ngành học 'chân truyền'",
    "desc": "Phân tích 3 yếu tố: Năng lực tự nhiên, Sở thích thật sự và Hoạt động ngoại khóa.",
    "content": "Đứng trước hàng ngàn lựa chọn ngành nghề, hệ thống **Career Clusters Framework** được thiết kế như một tấm bản đồ định vị hiệu quả. Thay vì tìm ngành đơn lẻ, hệ thống này kết hợp các nghề nghiệp có chung tính chất thành **16 nhóm lớn**.\n\nĐể biết bạn thuộc về nơi nào, cần đặt bản thân vào 3 yếu tố cốt lõi:\n\n---\n\n**1. Năng lực tự nhiên (Natural Aptitude)**\n\nBạn làm tốt điều gì mà không cần quá gồng mình? Đây không chỉ là điểm số GPA, mà là những thế mạnh bộc lộ vô thức trong quá trình học tập và giải quyết vấn đề.\n\nTự hỏi: *Khi làm việc nhóm, bạn thường được giao vai trò gì — người lên ý tưởng, người phản biện, hay người tổng hợp tài liệu?*\n\n---\n\n**2. Sở thích thật sự (True Passion)**\n\nRất nhiều bạn nhầm lẫn giữa \"sở thích\" và \"đam mê\". Thích lướt TikTok không có nghĩa là bạn hợp với ngành Digital Marketing. Sở thích thật sự phải đi liền với những **giá trị bạn quan tâm** và khát khao tạo ra sự thay đổi.\n\n---\n\n**3. Hoạt động ngoại khóa (Extracurricular Activities)**\n\nĐây là phép thử của thực tế — không phải để làm đẹp hồ sơ, mà để kiểm chứng xem năng lực và sở thích có thực sự ăn khớp nhau không.\n\n| Yếu tố | Câu hỏi tự vấn | Ví dụ |\n|---|---|---|\n| Năng lực tự nhiên | Tôi làm tốt nhất việc gì? | Viết lách mạch lạc, tổng hợp thông tin |\n| Sở thích | Vấn đề nào khiến tôi đào sâu tìm hiểu? | Bất bình đẳng xã hội, quyền con người |\n| Hoạt động | Tôi đã chứng minh điều đó qua dự án nào? | Ban nội dung trại hè xã hội |\n| Kết luận | Sự giao thoa là gì? | Giáo dục, Luật Quốc tế |"
  },
  {
    "id": 4,
    "partId": 1,
    "title": "Bài 4. Nghệ thuật Networking: Cách kết nối với các anh chị đi trước",
    "desc": "Quy trình 4 bước kèm mẫu tin nhắn/email kết nối.",
    "content": "Nhắc đến *Networking*, khái niệm này thường mang lại cảm giác ngần ngại — sợ làm phiền, sợ bị từ chối. Tuy nhiên, trò chuyện với các anh chị du học sinh đi trước là một trong những phương pháp hiệu quả nhất để có cái nhìn thực tế.\n\n---\n\n**Quy trình 4 bước Networking:**\n\n**Bước 1: Xác định đúng người (Targeting)**\nTìm những cá nhân đang học đúng ngành, đúng trường hoặc từng tham gia các hoạt động bạn đang hướng tới. Tận dụng mạng lưới bạn bè, LinkedIn, các nhóm Facebook chuyên ngành.\n\n**Bước 2: Gửi thông điệp ngắn gọn (Outreach)**\nLời chào đầu tiên cần: giới thiệu bản thân → lý do biết đến họ → lý do muốn kết nối → đề xuất gặp mặt kèm chủ đề.\n*Tránh tuyệt đối*: tin nhắn cụt lủn kiểu \"Chị ơi, cho em hỏi một câu được không?\"\n\n**Bước 3: Chuẩn bị trước khi gặp (Preparation)**\nNghiên cứu kỹ background trên LinkedIn. Chuẩn bị danh sách câu hỏi cụ thể về góc nhìn và trải nghiệm cá nhân của họ — không hỏi những gì đã có trên Google.\n\n**Bước 4: Duy trì mối quan hệ (Follow-up)**\nGửi tin nhắn/email cảm ơn ngay sau buổi nói chuyện. Cập nhật tiến độ hồ sơ của bạn cho họ biết.\n\n---\n\n**Mẫu email kết nối:**\n\n> **Tiêu đề:** Học sinh cấp 3 xin kinh nghiệm ứng tuyển [Tên Trại Hè]\n>\n> *Dạ em chào anh/chị, em là [Tên], hiện đang học lớp [Lớp]. Em có theo dõi hành trình của anh/chị và rất ấn tượng với những dự án cộng đồng anh/chị đã thực hiện.*\n>\n> *Hiện tại, em đang hoàn thiện hồ sơ ứng tuyển cho trại hè [Tên Trại Hè] mùa tới. Nếu anh/chị có khoảng 15–20 phút rảnh vào cuối tuần này, em rất mong được kết nối qua Google Meet để lắng nghe những chia sẻ từ trải nghiệm đi trước của anh/chị.*\n>\n> *Em cảm ơn anh/chị rất nhiều!*"
  },
  {
    "id": 5,
    "partId": 2,
    "title": "Bài 5. Sự thật về việc chọn ngành du học",
    "desc": "Phân tích ngành STEM, Data Science, và các ngành nên cân nhắc học tại VN.",
    "content": "Một trong những câu hỏi phổ biến nhất là: *\"Năm nay ngành nào đang hot, xin việc và có mức lương cao?\"* — Tư duy này là biểu hiện điển hình của tâm lý FOMO.\n\n**Sự thật**: Không có ngành học nào đảm bảo cho bạn sự nghiệp thành công nếu bản thân không có năng lực cốt lõi.\n\n---\n\n**1. Góc khuất của khối ngành STEM & Dữ liệu**\n\nNgành Data Science và Business Analytics hấp dẫn vì mức lương khởi điểm cao và chính sách STEM OPT kéo dài 3 năm tại Mỹ. Tuy nhiên, mức độ **cạnh tranh khốc liệt** và sự đào thải khắc nghiệt là thực tế ít ai nhắc tới.\n\nNếu bạn chọn Data Science chỉ vì nghe nói lương cao, nhưng lại chật vật với thống kê và lập trình, bạn sẽ rất dễ chìm nghỉm giữa hàng ngàn sinh viên quốc tế xuất chúng.\n\n---\n\n**2. Những ngành nên cân nhắc học tại Việt Nam:**\n\n| Ngành | Khó khăn khi du học | Lợi thế học tại VN |\n|---|---|---|\n| Luật | Hệ thống pháp luật mỗi nước khác nhau | Nắm vững luật sở tại, xây mạng lưới quan hệ |\n| Y khoa | Chi phí khổng lồ, rào cản giấy phép hành nghề | Chi phí hợp lý, thực hành lâm sàng với bệnh lý VN |\n| Chính trị | Đòi hỏi hiểu biết sâu về văn hóa địa phương | Cơ hội việc làm trong bộ máy nhà nước |\n\n---\n\n**3. Chiến lược khôn ngoan: Trở thành \"người giỏi\" thay vì tìm \"ngành hot\"**\n\nKỹ năng công nghệ ngày hôm nay có thể bị AI thay thế trong 5 năm tới. Chiến lược tối ưu là trang bị **bộ kỹ năng chuyển đổi**: tư duy phản biện, giải quyết vấn đề phức tạp, năng lực tự học.\n\nThị trường lao động luôn ưu ái top 10% của bất kỳ ngành nghề nào, hơn là những cá nhân trung bình của ngành đang dẫn đầu."
  },
  {
    "id": 6,
    "partId": 2,
    "title": "Bài 6. Phân tích 5 nhóm ngành: Công nghệ, Kinh doanh, Sức khỏe, Nghiên cứu & Nghệ thuật",
    "desc": "Đặc điểm từng ngành và những lưu ý bắt buộc khi chọn.",
    "content": "Sau khi hiểu rõ chính mình, bước tiếp theo là tìm hiểu kỹ về ngành học để xem bản thân có thực sự phù hợp không.\n\n---\n\n**1. Công nghệ & Khoa học Máy tính**\n\nGiá trị cốt lõi nằm ở **tư duy logic** và khả năng ứng dụng công nghệ để giải quyết bài toán vĩ mô. Đòi hỏi khả năng học tập liên tục trước tốc độ cập nhật chóng mặt của AI. Nếu có nền tảng toán học vững, hãy triển khai dự án cá nhân sớm nhất có thể.\n\n---\n\n**2. Kinh doanh & Quản lý**\n\nSai lầm phổ biến: chọn ngành Quản trị kinh doanh *chung*. Chiến lược tối ưu: chọn chuyên ngành hẹp như **Tài chính định lượng**, **Business Analytics**, hoặc **Quản trị Chuỗi cung ứng**.\n\n---\n\n**3. Sức khỏe & Y tế**\n\nĐòi hỏi sự tận tụy tuyệt đối và thời gian cam kết dài hạn. Tại Mỹ: bắt buộc hoàn thành 4 năm dự bị y khoa trước khi vào trường y. Các lộ trình khả thi hơn: Điều dưỡng, Khoa học Y sinh, Y tế Công cộng.\n\n---\n\n**4. Nghiên cứu Khoa học & Xã hội**\n\nTrọng tâm là **phương pháp luận nghiên cứu** và năng lực đọc viết học thuật cường độ cao. Môi trường tuyệt vời để hiện thực hóa những trăn trở cá nhân về xã hội.\n\n---\n\n**5. Nghệ thuật & Thiết kế**\n\nHồ sơ năng lực nghệ thuật quan trọng hơn GPA. Sự giao thoa giữa nghệ thuật và công nghệ mở ra hướng đi triển vọng: UX Design, truyền thông đa phương tiện, thiết kế công nghiệp.\n\n| Phân loại | Điểm mạnh | Thử thách |\n|---|---|---|\n| Công nghệ | Tư duy logic, cập nhật liên tục | Tốc độ thay đổi nhanh, cạnh tranh cao |\n| Kinh doanh | Kỹ năng giao tiếp, tư duy chiến lược | Nguy cơ thiếu chuyên môn sâu |\n| Sức khỏe | Kỷ luật, sức chịu đựng bền bỉ | Lộ trình dài, chi phí đắt |\n| Nghiên cứu | Tư duy phản biện đa chiều | Cần năng lực ngoại ngữ chuyên sâu |\n| Nghệ thuật | Sáng tạo, tư duy thẩm mỹ | Tốn thời gian xây dựng portfolio |"
  },
  {
    "id": 7,
    "partId": 2,
    "title": "Bài 7. Tổng hợp 'Kho tài nguyên' tự nghiên cứu ngành nghề chuẩn quốc tế",
    "desc": "Giới thiệu Vault Career Guide, Subreddit chuyên ngành, YouTube và các trang tra cứu.",
    "content": "Khi đã xác định được nhóm ngành phù hợp, hãy tự mình đào sâu vào thực tế thị trường lao động bằng các nền tảng tra cứu chuyên nghiệp.\n\n---\n\n**1. Vault Career Guide**\n\nNền tảng cung cấp báo cáo chi tiết về hàng trăm ngành nghề — từ một ngày làm việc điển hình đến lộ trình thăng tiến. Vault đặc biệt hữu ích để hiểu **cấu trúc của một ngành công nghiệp**: bắt đầu từ vị trí nào, cần chứng chỉ gì, mất bao nhiêu năm để lên quản lý cấp cao.\n\n→ [Vault Career Guide](https://vault.com/vault-guides)\n\n---\n\n**2. Cộng đồng ngành nghề (Facebook Groups)**\n\n- **VietTech** (công nghệ): Chia sẻ thực tế từ anh chị làm tại Microsoft, Meta\n- **VietPhD** (nghiên cứu): Thảo luận về research fit, đánh giá hồ sơ Tiến sĩ\n- **Vietnam Management Trainee**: Kinh nghiệm thi Aptitude Test, Digital Interview\n\n---\n\n**3. Reddit Subreddits theo ngành:**\n\n*Công nghệ:* r/cscareerquestions, r/datascience, r/MachineLearning\n*Tài chính:* r/consulting, r/FinancialCareers\n*Y tế:* r/medicine, r/medicalschool\n*Nghiên cứu:* r/academia, r/GradSchool, r/PhD\n*Thiết kế:* r/UI_Design, r/graphic_design\n\n---\n\n**4. Glassdoor & Blind**\n\nĐọc bản mô tả công việc (JD) là phương pháp nghiên cứu ngược hiệu quả: JD chỉ ra thị trường đang cần kỹ năng gì, từ đó chiếu ngược lại để chọn trường và ngành phù hợp.\n\n---\n\n**5. YouTube**\n\nTìm kiếm: *\"A day in the life of a...\"* để hình dung trực quan công việc thực tế.\n\n- Kinh doanh: Good Work, Duy Thanh Nguyen\n- Công nghệ: JomaTech\n- Startup: Lenny's Podcast, Y Combinator\n- Y tế: Doctor Mike"
  }
];

export const DEFAULT_MENTORS: MentorItem[] = [
  {
    id: 1,
    name: "Mentor Uyển Như",
    image: "/images/mentors/mentor-uyen-nhu-new.png",
    role: "Giáo dục, Chính sách xã hội & Kinh tế · UK / US",
    academics: [
      "Top 1% International Linguistic Olympiad (IOL) Vietnam 2025",
      "Huy chương Đồng International Economics Olympiad (IEO)",
      "A Level: A*A*A*A*",
      "Hơn 20+ giải thưởng nghiên cứu và khởi nghiệp quốc gia, quốc tế",
    ],
    leadership: [
      "GreenerFuture Vietnam (Head Intern): dẫn dắt đội ngũ 11+ thực tập sinh, trực tiếp quản lý dự án hợp tác trị giá ~$760,000 với PUMA.",
      "World Economic Forum – Global Shapers (Junior Curator): một trong những thành viên trung học trẻ nhất toàn cầu, Top 100 Global Shapers Innovation Prize.",
      "DECA x Vinschool (Founder): thành lập chapter DECA đầu tiên tại trường, huấn luyện học sinh về kinh doanh và khởi nghiệp.",
    ],
    admits: [
      "Top UK: LSE, UCL, University of Manchester, University of Bristol (Giáo dục & Chính sách xã hội)",
      "DePauw University — 7,2 tỷ VNĐ",
      "Mount Holyoke College — 7 tỷ VNĐ",
      "Denison University — 6,7 tỷ VNĐ",
      "St. Olaf College — Học bổng Tổng thống, 6,3 tỷ VNĐ",
      "Union College — 5,7 tỷ VNĐ",
    ],
  },
  {
    id: 2,
    name: "Mentor Bảo Linh",
    image: "/images/mentors/mentor-bao-linh-new.png",
    role: "Y khoa & Khoa học sức khỏe",
    academics: [
      "Học bổng toàn phần Cử nhân Y khoa (MD) tại VinUniversity",
      "Huy chương Bạc International Medical & Biology Competition (IMBC)",
      "Top 15 toàn cầu Inter Medical School Physiology Quiz (IMSPQ)",
    ],
    leadership: [
      "MedMate (Co-Founder & Product Owner): đồng sáng lập startup HealthTech tại Việt Nam, ứng dụng AI/LLMs tối ưu hóa quy trình lâm sàng cho bác sĩ.",
      "National Medical Academic Competition – NMAC (Founder): tiên phong tổ chức cuộc thi y khoa toàn quốc đầu tiên kết hợp lý thuyết và lâm sàng, thu hút hơn 20 trường đại học.",
      "Student Academic Medical Organization – SAMO (Founder): xây dựng tổ chức hỗ trợ học thuật cho sinh viên Y khoa đầu tiên tại VinUniversity, phục vụ hơn 200 sinh viên.",
    ],
    admits: ["Học bổng toàn phần chương trình MD, VinUniversity"],
  },
  {
    id: 3,
    name: "Mentor Bảo Minh",
    image: "/images/mentors/mentor-bao-minh-new.png",
    role: "Kỹ thuật, Kỹ năng cứng & Tinh thần khởi nghiệp",
    academics: [
      "Học bổng 90% Cử nhân Quản trị kinh doanh tại VinUni",
      "Quán quân SOICT Student Creative Ideas Challenge 2025",
      "Quán quân GIC Startup Competition 2024",
      "Top 10 Startup Wheel International 2025",
    ],
    leadership: [
      "Electroverse (Co-Founder): tiên phong cung cấp giải pháp giáo dục STEM toàn diện, thiết lập quan hệ đối tác với hơn 30 trường học và đạt mốc doanh thu 1 tỷ VNĐ.",
      "Project X Vietnam (Deputy Head of External Relations): kết nối hơn 40 đối tác công nghệ, tập đoàn lớn và mang về hơn 50 cơ hội thực tập cho học sinh, sinh viên.",
    ],
    admits: ["Học bổng 90% Quản trị kinh doanh, VinUniversity"],
  },
];

// Storage Keys
const STORAGE_KEY_POSTS = "univenture_library_posts";
const STORAGE_KEY_TUTORS = "univenture_tutors";
const STORAGE_KEY_MENTORS = "univenture_mentors";
const STORAGE_KEY_ADMIN_USERS = "univenture_admin_users";
const STORAGE_KEY_AUDIT_LOGS = "univenture_audit_logs";
const STORAGE_KEY_CATEGORIES = "univenture_filter_categories";
export const SESSION_KEY_AUTH = "univenture_admin_auth";
export const SESSION_KEY_CURRENT_ADMIN = "univenture_current_admin";

// Default filter categories with structured levels and subjects
export const DEFAULT_FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: "CHECKPOINT",
    label: "Checkpoint (Lớp 6 - 8)",
    subjects: [
      { id: "mathematics", label: "Checkpoint Mathematics" },
      { id: "science", label: "Checkpoint Science 8" },
      { id: "khoa học tự nhiên", label: "KHTN Vinschool" },
    ],
  },
  {
    id: "IGCSE",
    label: "IGCSE (Lớp 9 - 10)",
    subjects: [
      { id: "mathematics", label: "IGCSE Math (0580) G9 & G10" },
      { id: "science", label: "IGCSE Coordinated Science (0654)" },
      { id: "chemistry", label: "IGCSE Chemistry (0620)" },
      { id: "biology", label: "IGCSE Biology (0610)" },
      { id: "computer", label: "IGCSE Computer Science" },
    ],
  },
  {
    id: "A LEVEL",
    label: "AS & A Level (Lớp 11 - 12)",
    subjects: [
      { id: "mathematics", label: "AS & A Level Math (9709)" },
      { id: "physics", label: "AS & A Level Physics (9702)" },
      { id: "chemistry", label: "AS & A Level Chemistry" },
      { id: "biology", label: "AS & A Level Biology" },
    ],
  },
];

export const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    email: "admin@univentureadmissions.com",
    addedAt: "2026-01-01T00:00:00.000Z",
    addedBy: "System",
  },
  {
    email: "admin@univenture.vn",
    addedAt: "2026-01-01T00:00:00.000Z",
    addedBy: "System",
  },
  {
    email: "tutor@univenture.vn",
    addedAt: "2026-01-01T00:00:00.000Z",
    addedBy: "System",
  },
];

// Helper functions for localStorage
export function getStoredTutors(): TutorItem[] {
  if (typeof window === "undefined") return DEFAULT_TUTORS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_TUTORS);
    return data ? JSON.parse(data) : DEFAULT_TUTORS;
  } catch {
    return DEFAULT_TUTORS;
  }
}

export function saveStoredTutors(tutors: TutorItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_TUTORS, JSON.stringify(tutors));
  } catch (e) {
    console.error("Error saving tutors:", e);
  }
}

export function getStoredMentors(): MentorItem[] {
  if (typeof window === "undefined") return DEFAULT_MENTORS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_MENTORS);
    return data ? JSON.parse(data) : DEFAULT_MENTORS;
  } catch {
    return DEFAULT_MENTORS;
  }
}

export function saveStoredMentors(mentors: MentorItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_MENTORS, JSON.stringify(mentors));
  } catch (e) {
    console.error("Error saving mentors:", e);
  }
}

export function getStoredPosts(): ResourcePost[] {
  if (typeof window === "undefined") return DEFAULT_POSTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_POSTS);
    return data ? JSON.parse(data) : DEFAULT_POSTS;
  } catch {
    return DEFAULT_POSTS;
  }
}

export function saveStoredPosts(posts: ResourcePost[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
  } catch (e) {
    console.error("Error saving posts:", e);
  }
}

// Admin Users Management
export function getAdminUsers(): AdminUser[] {
  if (typeof window === "undefined") return DEFAULT_ADMIN_USERS;
  try {
    const data = localStorage.getItem(STORAGE_KEY_ADMIN_USERS);
    if (!data) return DEFAULT_ADMIN_USERS;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ADMIN_USERS;
  } catch {
    return DEFAULT_ADMIN_USERS;
  }
}

export function saveAdminUsers(users: AdminUser[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving admin users:", e);
  }
}

export function addAdminUser(email: string, addedBy: string): { success: boolean; message: string } {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) {
    return { success: false, message: "Email không hợp lệ!" };
  }
  const currentUsers = getAdminUsers();
  if (currentUsers.some((u) => u.email.toLowerCase() === normalized)) {
    return { success: false, message: "Email này đã có quyền quản trị!" };
  }
  const newUser: AdminUser = {
    email: normalized,
    addedAt: new Date().toISOString(),
    addedBy,
  };
  const updated = [...currentUsers, newUser];
  saveAdminUsers(updated);
  logAdminAction(addedBy, "CẤP QUYỀN", "ADMIN", `Cấp quyền quản trị cho email ${normalized}`);
  return { success: true, message: `Đã cấp quyền admin cho ${normalized} thành công!` };
}

export function removeAdminUser(email: string, removedBy: string): { success: boolean; message: string } {
  const normalized = email.trim().toLowerCase();
  const currentUsers = getAdminUsers();
  if (currentUsers.length <= 1) {
    return { success: false, message: "Không thể xóa admin cuối cùng trong hệ thống!" };
  }
  if (normalized === removedBy.trim().toLowerCase()) {
    return { success: false, message: "Bạn không thể tự xóa tài khoản của chính mình!" };
  }
  const updated = currentUsers.filter((u) => u.email.toLowerCase() !== normalized);
  saveAdminUsers(updated);
  logAdminAction(removedBy, "THU HỒI", "ADMIN", `Thu hồi quyền quản trị của email ${normalized}`);
  return { success: true, message: `Đã thu hồi quyền quản trị của ${normalized}!` };
}

export function getCurrentAdmin(): string {
  if (typeof window === "undefined") return "admin@univentureadmissions.com";
  return sessionStorage.getItem(SESSION_KEY_CURRENT_ADMIN) || "admin@univentureadmissions.com";
}

export function setCurrentAdmin(email: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY_AUTH, "true");
  sessionStorage.setItem(SESSION_KEY_CURRENT_ADMIN, email.trim().toLowerCase());
}

export function clearCurrentAdmin() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY_AUTH);
  sessionStorage.removeItem(SESSION_KEY_CURRENT_ADMIN);
}

export function validateAdminLogin(email: string, pass: string): { success: boolean; message?: string } {
  const normalizedPass = pass.trim();

  if (!email.trim()) {
    return { success: false, message: "Vui lòng nhập email quản trị!" };
  }

  if (normalizedPass !== UNIFIED_ADMIN_PASSWORD) {
    return { success: false, message: "Mật khẩu không đúng! Vui lòng thử lại." };
  }

  return { success: true };
}

// Audit Logs Management
export function getAuditLogs(): AuditLogItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY_AUDIT_LOGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function logAdminAction(adminEmail: string, action: string, target: string, details: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getAuditLogs();
    const newLog: AuditLogItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      adminEmail: adminEmail || "admin@univentureadmissions.com",
      action,
      target,
      details,
    };
    const updated = [newLog, ...current].slice(0, 150);
    localStorage.setItem(STORAGE_KEY_AUDIT_LOGS, JSON.stringify(updated));
  } catch (e) {
    console.error("Error logging admin action:", e);
  }
}

// Dynamic Filter Categories & Subjects Management
export function getStoredFilterCategories(): FilterCategory[] {
  if (typeof window === "undefined") return DEFAULT_FILTER_CATEGORIES;
  try {
    const data = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (!data) return DEFAULT_FILTER_CATEGORIES;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FILTER_CATEGORIES;
  } catch {
    return DEFAULT_FILTER_CATEGORIES;
  }
}

export function saveStoredFilterCategories(cats: FilterCategory[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(cats));
  } catch (e) {
    console.error("Error saving categories:", e);
  }
}

export function registerCategoryAndSubject(
  categoryLabel: string,
  subjectLabel: string,
  adminEmail?: string
): { categoryId: string; subjectId: string; fullClassTag: string } {
  const cats = getStoredFilterCategories();
  const trimmedCat = categoryLabel.trim();
  const trimmedSubj = subjectLabel.trim();

  let matchedCat = cats.find(
    (c) =>
      c.label.toLowerCase() === trimmedCat.toLowerCase() ||
      c.id.toLowerCase() === trimmedCat.toLowerCase()
  );

  let updatedCats = [...cats];

  if (!matchedCat) {
    const newCatId = trimmedCat.toUpperCase().replace(/[^A-Z0-9]/g, "_") || `CAT_${Date.now()}`;
    matchedCat = {
      id: newCatId,
      label: trimmedCat,
      subjects: [],
    };
    updatedCats.push(matchedCat);
  }

  const existingSubj = matchedCat.subjects.find(
    (s) => s.label.toLowerCase() === trimmedSubj.toLowerCase()
  );

  let subjId = existingSubj ? existingSubj.id : "";

  if (!existingSubj) {
    subjId = trimmedSubj.toLowerCase().replace(/[^a-z0-9]/g, "_") || `subj_${Date.now()}`;
    const newSubj: FilterSubject = {
      id: subjId,
      label: trimmedSubj,
    };
    matchedCat.subjects.push(newSubj);
    updatedCats = updatedCats.map((c) => (c.id === matchedCat!.id ? matchedCat! : c));
  }

  saveStoredFilterCategories(updatedCats);

  if (adminEmail) {
    logAdminAction(
      adminEmail,
      "THÊM MÔN/CẤP ĐỘ",
      "CATEGORY",
      `Thêm môn "${trimmedSubj}" thuộc cấp độ "${matchedCat.label}"`
    );
  }

  return {
    categoryId: matchedCat.id,
    subjectId: subjId,
    fullClassTag: `${matchedCat.id} - ${trimmedSubj}`,
  };
}

export function removeSubjectFromCategory(
  categoryId: string,
  subjectId: string,
  adminEmail?: string
): boolean {
  const cats = getStoredFilterCategories();
  const updated = cats.map((c) => {
    if (c.id !== categoryId) return c;
    return { ...c, subjects: c.subjects.filter((s) => s.id !== subjectId) };
  });
  saveStoredFilterCategories(updated);
  if (adminEmail) {
    const cat = cats.find((c) => c.id === categoryId);
    const subj = cat?.subjects.find((s) => s.id === subjectId);
    logAdminAction(adminEmail, "XÓA MÔN", "CATEGORY", `Xóa môn "${subj?.label}" khỏi cấp độ "${cat?.label}"`);
  }
  return true;
}

export function deleteCategoryById(categoryId: string, adminEmail?: string): boolean {
  const cats = getStoredFilterCategories();
  if (cats.length <= 1) return false; // keep at least one category
  const cat = cats.find((c) => c.id === categoryId);
  const updated = cats.filter((c) => c.id !== categoryId);
  saveStoredFilterCategories(updated);
  if (adminEmail) {
    logAdminAction(adminEmail, "XÓA CẤP ĐỘ", "CATEGORY", `Xóa cấp độ "${cat?.label}" và toàn bộ ${cat?.subjects.length} môn`);
  }
  return true;
}
