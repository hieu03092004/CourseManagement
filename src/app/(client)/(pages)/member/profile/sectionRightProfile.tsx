import Link from "next/link";
import { IProfile } from "../../../interfaces/IProfile";
import Input from "../../../components/Form/Input";
import ButtonInput from "../../../components/Button/btn_input";

interface SectionRightProfileProps {
  profile: IProfile | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SectionRightProfile({ profile, onSubmit }: SectionRightProfileProps) {
  return (
    <div className="rounded-[8px] bg-gray-50 mb-[10px] p-[15px] h-full">
      <form onSubmit={onSubmit} className="contact-form" autoComplete="off">
        <h2 className="text-[20px] font-[700] mb-[20px] text-dark1">Sửa thông tin</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <Input
              htmlFor="full_name"
              label="Họ và tên:"
              name="full_name"
              defaultValue={profile?.name || ""}
              type="text"
              required
            />

            <Input
              htmlFor="birthday"
              label="Ngày sinh:"
              name="birthday"
              defaultValue={profile?.dateOfBirth || ""}
              type="text"
              placeholder="dd/mm/yyyy"
            />

            <div className="mb-[20px]">
              <label htmlFor="sex" className="block text-[14px] font-medium text-dark1 mb-[10px]">
                Giới tính:
              </label>
              <select
                name="sex"
                defaultValue={profile?.gender === "Nam" ? "male" : profile?.gender === "Nữ" ? "female" : "other"}
                className="w-full px-[22px] py-[15px] border border-gray-300 rounded-md bg-white focus:outline-none focus:border-hightlight"
              >
                <option value="other">Giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>

            <div className="mb-[20px]">
              <label className="block text-[14px] font-medium text-dark1 mb-[10px]">
                Email:
              </label>
              <div>
                {profile?.email || ""}
                <small>
                  <Link href="/member/change-email" className="text-red-500 ml-2 hover:text-hightlight">
                    (Chỉnh sửa)
                  </Link>
                </small>
              </div>
              <input name="email" type="hidden" value={profile?.email || ""} />
            </div>

            <div className="mb-[20px]">
              <label className="block text-[14px] font-medium text-dark1 mb-[10px]">
                Số điện thoại:
              </label>
              <div>
                {profile?.phone || ""}
                <small>
                  <Link href="/member/change-phone" className="text-red-500 ml-2 hover:text-hightlight">
                    (Chỉnh sửa)
                  </Link>
                </small>
              </div>
              <input name="phone" type="hidden" value={profile?.phone || ""} />
            </div>

            <ButtonInput text="Cập nhật" />
          </div>
        </div>
      </form>
    </div>
  );
}


