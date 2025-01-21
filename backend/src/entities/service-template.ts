import Express from "express";

interface ServiceResponse {
  status: number;
  msg: string;
  data: any;
}

interface ServiceTemplateProps {
  res: Express.Response;
  service: Promise<ServiceResponse>;
}

export async function serviceTemplate(props: ServiceTemplateProps) {
  const { res, service } = props;
  try {
    const req: ServiceResponse = await service;
    res.status(req.status).send({ msg: req.msg, data: req.data });
  } catch (e) {
    res.status(400).send({ msg: "Something went wrong", data: e });
  }
}
