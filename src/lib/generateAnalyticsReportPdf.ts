import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import autoTable, { type CellHookData } from 'jspdf-autotable';
import { buildAlertsByAreaFromDashboard } from '@/lib/buildReportAlertsByArea';
import { buildDailyPdfAlertGroups } from '@/lib/buildReportDetail';
import { DASHBOARD_ALERTS_SEED } from '@/lib/dashboardAlertsSeed';
import type { DashboardAlertsState, ReportDetailSection } from '@/types/dashboardAlerts';

export type GenerateSimpleReportOptions = {
  plantName?: string;
  alerts?: DashboardAlertsState;
};

/** Guardex brand red #e31e24 */
const BRAND_RED: [number, number, number] = [227, 30, 36];
const BRAND_RED_LIGHT: [number, number, number] = [253, 232, 233];
const INK: [number, number, number] = [24, 24, 25];
const PAPER: [number, number, number] = [248, 247, 243];

const TABLE_THEME = {
  styles: { fontSize: 8, cellPadding: 2.2, overflow: 'linebreak' as const },
  headStyles: {
    fillColor: BRAND_RED,
    textColor: 255,
    fontStyle: 'bold' as const,
  },
  alternateRowStyles: { fillColor: PAPER },
  margin: { left: 14, right: 14 },
};

function getLastTableY(doc: jsPDF): number {
  const finalY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable
    ?.finalY;
  return finalY ?? 14;
}

function statusColumnIndex(columns: { key: string }[]): number {
  return columns.findIndex((c) => c.key === 'status');
}

function styleStatusCells(data: CellHookData, statusCol: number) {
  if (data.section !== 'body' || statusCol < 0 || data.column.index !== statusCol) {
    return;
  }
  const value = String(data.cell.raw ?? '').toLowerCase();
  if (value === 'active') {
    data.cell.styles.textColor = BRAND_RED;
    data.cell.styles.fontStyle = 'bold';
  } else if (value === 'resolved') {
    data.cell.styles.textColor = [90, 90, 90];
  }
}

function drawSectionTable(
  doc: jsPDF,
  startY: number,
  section: ReportDetailSection
): number {
  const head = [section.columns.map((c) => c.label)];
  const statusCol = statusColumnIndex(section.columns);
  const body =
    section.rows.length > 0
      ? section.rows.map((row) =>
          section.columns.map((c) => String(row[c.key] ?? '—'))
        )
      : [
          [
            {
              content: 'No alerts recorded',
              colSpan: section.columns.length,
              styles: { halign: 'center' as const, textColor: [120, 120, 120] },
            },
          ],
        ];

  autoTable(doc, {
    ...TABLE_THEME,
    startY,
    head,
    body,
    theme: 'grid',
    didParseCell: (data) => styleStatusCells(data, statusCol),
  });

  return getLastTableY(doc);
}

function drawBrandHeader(doc: jsPDF, plantName: string, reportDate: Date, totalAlerts: number) {
  const pageW = doc.internal.pageSize.getWidth();

  doc.setFillColor(...BRAND_RED);
  doc.rect(0, 0, pageW, 3, 'F');

  let y = 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...BRAND_RED);
  doc.text('Guardex Daily Site Report', 14, y);

  y += 7;
  doc.setDrawColor(...BRAND_RED);
  doc.setLineWidth(0.6);
  doc.line(14, y, 80, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  doc.text(`${plantName} · ${format(reportDate, 'EEEE, dd MMMM yyyy')}`, 14, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Total alerts: ', 14, y);
  const labelW = doc.getTextWidth('Total alerts: ');
  doc.setTextColor(...BRAND_RED);
  doc.text(String(totalAlerts), 14 + labelW, y);
  doc.setTextColor(...INK);

  return y + 12;
}

function drawHeading(doc: jsPDF, y: number, text: string, size = 12) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(size);
  doc.setTextColor(...BRAND_RED);
  doc.text(text, 14, y);
  doc.setTextColor(...INK);
  return y + (size >= 12 ? 7 : 5);
}

function ensureSpace(doc: jsPDF, y: number, needed = 40): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + needed > pageHeight - 14) {
    doc.addPage();
    drawPageAccent(doc);
    return 18;
  }
  return y;
}

function drawPageAccent(doc: jsPDF) {
  const pageW = doc.internal.pageSize.getWidth();
  doc.setFillColor(...BRAND_RED);
  doc.rect(0, 0, pageW, 2, 'F');
}

/** Daily report PDF with summary + one table per alert category. */
export async function generateSimpleDailyReportPdf(
  options: GenerateSimpleReportOptions = {}
): Promise<Uint8Array> {
  const plantName = options.plantName ?? 'Gautam Plant';
  const alerts = options.alerts ?? DASHBOARD_ALERTS_SEED;
  const reportDate = new Date();

  const { rows, segments, totalAlerts } = buildAlertsByAreaFromDashboard(alerts);
  const alertGroups = buildDailyPdfAlertGroups(alerts);

  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

  let y = drawBrandHeader(doc, plantName, reportDate, totalAlerts);

  y = drawHeading(doc, y, 'Alerts by area', 12);
  y = ensureSpace(doc, y, 30);

  const areaHead = ['#', 'Area', ...segments.map((s) => s.label), 'Total'];
  const totalColIndex = areaHead.length - 1;
  const areaBody =
    rows.length > 0
      ? rows.map((r, i) => [
          String(i + 1).padStart(2, '0'),
          String(r.area ?? '—'),
          ...segments.map((s) => String(Number(r[s.key]) || 0)),
          String(r._total ?? 0),
        ])
      : [['—', 'No alerts', ...segments.map(() => '0'), '0']];

  autoTable(doc, {
    ...TABLE_THEME,
    startY: y,
    head: [areaHead],
    body: areaBody,
    didParseCell: (data) => {
      if (data.section === 'head' && data.column.index > 1) {
        return;
      }
      if (data.section === 'body' && data.column.index === totalColIndex) {
        data.cell.styles.textColor = BRAND_RED;
        data.cell.styles.fontStyle = 'bold';
      }
      if (data.section === 'body' && data.row.index % 2 === 1) {
        data.cell.styles.fillColor = BRAND_RED_LIGHT;
      }
    },
  });
  y = getLastTableY(doc) + 12;

  for (const { group, sections } of alertGroups) {
    y = ensureSpace(doc, y, 24);
    y = drawHeading(doc, y, group, 13);
    y += 2;

    for (const section of sections) {
      y = ensureSpace(doc, y, 28);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...BRAND_RED);
      doc.text(section.title, 14, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(90, 90, 90);
      doc.text(`${section.description} · `, 14, y);
      const descW = doc.getTextWidth(`${section.description} · `);
      doc.setTextColor(...BRAND_RED);
      doc.setFont('helvetica', 'bold');
      doc.text(`${section.count} record(s)`, 14 + descW, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...INK);
      y += 5;

      y = drawSectionTable(doc, y, section);
      y += 10;
    }
  }

  return new Uint8Array(doc.output('arraybuffer'));
}

export function downloadAnalyticsReportPdf(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
