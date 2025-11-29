// timeFilters.ts
export type TimeFilterOption = {
  id: string;
  label: string;
  subtitle: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
};

const pad2 = (n: number) => n.toString().padStart(2, "0");

const formatDate = (d: Date) => {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
};

const getLastDayOfMonth = (year: number, month: number): number => {
  // month: 1-12
  return new Date(year, month, 0).getDate();
};

/**
 * Sinh ra các option thời gian:
 * - Tháng bắt đầu của quý -> tháng hiện tại
 * - Quý hiện tại (từ đầu quý -> hôm nay)
 * - Cả năm (từ 01/01 -> hôm nay)
 */
export function buildTimeFilters(now: Date = new Date()): TimeFilterOption[] {
  const year = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-12
  const todayStr = formatDate(now);
  const todayDay = pad2(now.getDate());
  const currentMonthStr = pad2(currentMonth);

  // xác định quý hiện tại
  const quarterIndex = Math.floor((currentMonth - 1) / 3); // 0..3
  const quarterNumber = quarterIndex + 1; // 1..4
  const quarterStartMonth = quarterIndex * 3 + 1; // 1,4,7,10

  const options: TimeFilterOption[] = [];

  // 1) Các tháng trong quý hiện tại
  for (let m = quarterStartMonth; m <= currentMonth; m++) {
    const mm = pad2(m);
    const monthLabel = `Tháng ${m}/${year}`;
    const startDate = `${year}-${mm}-01`;

    let endDate: string;
    let subtitle: string;

    if (m === currentMonth) {
      // tháng hiện tại: 01 -> hôm nay
      endDate = todayStr;
      subtitle = `Dữ liệu từ 01–${todayDay}/${mm}/${year}`;
    } else {
      // tháng đã qua: full tháng
      const lastDay = pad2(getLastDayOfMonth(year, m));
      endDate = `${year}-${mm}-${lastDay}`;
      subtitle = `Dữ liệu trong tháng ${mm}/${year}`;
    }

    options.push({
      id: `${year}-${mm}`,
      label: monthLabel,
      subtitle,
      startDate,
      endDate,
    });
  }

  // 2) Quý hiện tại (từ đầu quý -> hôm nay)
  const qStartMonthStr = pad2(quarterStartMonth);
  options.push({
    id: `${year}-Q${quarterNumber}`,
    label: `Quý ${quarterNumber}/${year} (${quarterStartMonth}–${currentMonth})`,
    subtitle: `Dữ liệu từ 01/${qStartMonthStr}/${year} đến ${todayDay}/${currentMonthStr}/${year}`,
    startDate: `${year}-${qStartMonthStr}-01`,
    endDate: todayStr,
  });

  // 3) Cả năm đến hiện tại (YTD)
  options.push({
    id: `${year}-YTD`,
    label: `Cả năm ${year} (YTD)`,
    subtitle: `Dữ liệu từ 01/01/${year} đến ${todayDay}/${currentMonthStr}/${year}`,
    startDate: `${year}-01-01`,
    endDate: todayStr,
  });

  return options;
}
