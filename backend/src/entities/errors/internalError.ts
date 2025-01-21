export const internalError = data => ({
  msg: "Internal server error.",
  status: 500,
  data: data
});
