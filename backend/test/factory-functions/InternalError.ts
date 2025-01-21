import { ResponseData } from "@entities/response-data";

export function internalError(): ResponseData {
  return {
    msg: "Internal server erro",
    status: 500,
    data: {}
  };
}
