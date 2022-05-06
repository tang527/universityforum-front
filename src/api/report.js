import request from "@/utils/request";

export function getReportTypes(kind) {
  return request({
    url: "report/get_report_types",
    params: { kind: kind },
    method: "get"
  });
}

export function createReport(data) {
  return request({
    url: "report/create_report",
    data: data,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
