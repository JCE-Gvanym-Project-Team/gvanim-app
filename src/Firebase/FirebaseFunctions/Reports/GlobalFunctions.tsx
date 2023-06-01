import { Candidate } from "../Candidate";
import { CandidateJobStatus } from "../CandidateJobStatus";
import { Job, loginAdmin, getFilteredCandidateJobStatuses, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";
import * as XLSX from 'xlsx';



export async function filterByDates(listCandidates: CandidateJobStatus[], dates: Date[]): Promise<CandidateJobStatus[]> {
    let candidatesWithCasueReject: Array<CandidateJobStatus> = [];

    for (let i = 0; i < listCandidates.length; i++) {
        let candidate = listCandidates[i];
        if (candidate._applyDate >= dates[0] && candidate._lastUpdate <= dates[1])
            candidatesWithCasueReject.push(candidate);
    }

    return candidatesWithCasueReject;
}


export async function exportToExcel(tableResule: any[], reportName: string) {
    // Convert the result data to the Excel format
    const worksheet = XLSX.utils.json_to_sheet(tableResule);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Generate the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(data);
    downloadLink.href = url;
    downloadLink.download = reportName + '.xlsx';

    // Trigger the download
    downloadLink.click();

}