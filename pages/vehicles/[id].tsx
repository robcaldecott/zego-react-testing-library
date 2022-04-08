import { useRouter } from "next/router";
import { Details } from "@/containers";
import type { NextPage } from "next";

const DetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Details id={id as string} />;
};

export default DetailsPage;
