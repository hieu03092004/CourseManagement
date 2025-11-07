### Quy ước tổng quát Page – Component – Interface

- **Page (route entry)**: Chỉ render component cha/container, không chứa dữ liệu cứng, không xử lý UI chi tiết, hạn chế gọi API trực tiếp nếu có container đảm nhiệm.
- **Component cha (Container/Section)**: Chuẩn bị hoặc nhận dữ liệu, mọi dữ liệu phải gán kiểu bằng interface; khai báo mảng dữ liệu có kiểu và `.map()` xuống component con qua `props`.
- **Component con (Presentational)**: Nhận `props` có kiểu rõ ràng (không `any`), chỉ render UI, không fetch/side-effect, không mutate `props`.
- **Interface dữ liệu**: Đặt tại `src/app/(client)/interfaces` (hoặc thư mục `interfaces` cùng domain), tên file theo `I<Model>.ts`, `export interface IModel { ... }` và import tương đối nhất quán.
- **Props typing**: Ưu tiên `XxxProps` cho props của component, ví dụ `{ item: IModel }`. Không để implicit `any`.
- **Luồng dữ liệu**: Kiến trúc `page → Parent → Child(ren)`; dữ liệu chảy 1 chiều từ trên xuống. Nếu nhiều con cần cùng dữ liệu, nâng state lên cha hoặc dùng Context có typing.
- **Hiển thị & a11y**: Định dạng số/tiền tệ bằng `toLocaleString('vi-VN')`; ảnh luôn có `alt`; className giữ thống nhất.
- **Naming**: Component PascalCase; interface tiền tố `I`; props interface hậu tố `Props`; helper cục bộ không side-effect.
- **Mock data**: Chỉ dùng khi demo; vẫn phải theo interface; thay bằng fetch/SSR khi triển khai thực tế.

### Ví dụ áp dụng (CardList/CardItem/ICourse)

- **Page gọi Component cha**: File `page.tsx` chỉ nhập và render component cha (`CardList`), không chứa dữ liệu cứng hay logic hiển thị chi tiết.
- **Component cha gọi Component con**: `CardList` giữ trách nhiệm chuẩn bị dữ liệu (mảng) và `.map()` để truyền từng phần tử xuống component con (`CardItem`) qua `props`.
- **Dữ liệu phải theo interface**: Mọi dữ liệu course phải tuân thủ `ICourse` trong `src/app/(client)/interfaces/ICourse.ts`. Import interface đúng từ component sử dụng.
- **Props rõ ràng, có kiểu**: `CardItem` nhận `props` dạng `{ course: ICourse }`. Không truy cập dữ liệu toàn cục bên trong con nếu không cần thiết.
- **Định nghĩa dữ liệu tại cha**: `CardList` khai báo `const courses: ICourse[] = [...]` và truyền xuống `<CardItem course={course} />`.
- **Hiển thị chỉ ở con**: `CardItem` chỉ render UI theo `props.course`, có thể có helper cục bộ (ví dụ render sao), không fetch/side-effect.
- **Đường dẫn import nhất quán**: Dùng import tương đối ngắn gọn, ví dụ `../../interfaces/ICourse` từ component client.
- **Chuẩn format & a11y**: Dùng `toLocaleString('vi-VN')` cho tiền tệ; `img` cần `alt`; giữ className theo Tailwind hiện có.
- **Cấu trúc tham chiếu**: `page.tsx → CardList → CardItem` với dữ liệu tuân thủ `ICourse`.

Phạm vi áp dụng: `src/app/(client)/(pages)/(home)/page.tsx`, `src/app/(client)/components/Card/CardList.tsx`, `src/app/(client)/components/Card/CardItem.tsx`, `src/app/(client)/interfaces/ICourse.ts`.
